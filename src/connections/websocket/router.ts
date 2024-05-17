import Validation from './validation.js';
import * as enums from '../../enums/index.js';
import * as errors from '../../errors/index.js';
import State from '../../state.js';
import ChangeCharacterStatusDto from '../../structure/modules/character/changeState/dto.js';
import ChangeCharacterLocationDto from '../../structure/modules/characterLocation/change/dto.js';
import GetCharacterLocationDto from '../../structure/modules/characterLocation/get/dto.js';
import CreateFightDto from '../../structure/modules/fights/debug/dto.js';
import GetCharacterDto from '../../structure/modules/npc/get/dto.js';
import CharacterStatsDto from '../../structure/modules/stats/get/dto.js';
import Log from '../../tools/logger/index.js';
import type * as types from './types/index.js';
import type { IChangeCharacterLocationDto } from '../../structure/modules/characterLocation/change/types.js';
import type { IGetCharacterLocationDto } from '../../structure/modules/characterLocation/get/types.js';
import type { ICreateFightDto } from '../../structure/modules/fights/debug/types.js';
import type { IProfileEntity } from '../../structure/modules/profile/entity.js';
import type { IFullError } from '../../types/index.js';

export default class Router {
  private readonly _validator: Validation;

  constructor() {
    this._validator = new Validation();
  }

  private get validator(): Validation {
    return this._validator;
  }

  handleChatMessage(message: types.ISocketInMessage, ws: types.ISocket): void {
    this.validator.preValidate(message);

    switch (message.subTarget) {
      case enums.EMessageSubTargets.Send:
        return this.sendMessage(message.payload as types.ISocketSendMessageBody, ws);
      case enums.EMessageSubTargets.Read:
        return this.readMessage(message.payload as types.IReadMessageBody, ws);
      case enums.EMessageSubTargets.Get:
        return this.getMessage(message.payload as types.IGetMessageBody, ws);
      case enums.EMessageSubTargets.GetUnread:
        return this.getUnread(message.payload as types.IGetMessageBody, ws);
      default:
        return this.handleError(new errors.IncorrectTargetError(), ws);
    }
  }

  handleMovementMessage(message: types.ISocketInMessage, ws: types.ISocket): void {
    this.validator.preValidate(message);
    this.validator.validateCanMove(ws);

    switch (message.subTarget) {
      case enums.EMovementSubTargets.Move:
        return this.moveCharacter(message.payload as IChangeCharacterLocationDto, ws);
      case enums.EMovementSubTargets.Get:
        return this.getCharacterLocation(message.payload as IGetCharacterLocationDto, ws);
      default:
        return this.handleError(new errors.IncorrectTargetError(), ws);
    }
  }

  handleError(err: IFullError, ws: types.ISocket): void {
    if (process.env.NODE_ENV !== 'production') console.trace(err);
    const { message, code, name } = err;

    const body = JSON.stringify({
      type: enums.ESocketType.Error,
      payload: {
        message,
        code,
        name,
      },
    });
    return ws.send(body);
  }

  private sendMessage(data: types.ISocketSendMessageBody, ws: types.ISocket): void {
    this.validator.validateSendMessage(data);
    const prepared: types.ISendMessageDto = {
      body: data.message,
      receiver: data.target,
      sender: ws.userId,
    };

    ws.reqHandler.chat
      .send(prepared, { userId: ws.userId, tempId: '', type: enums.EUserTypes.User })
      .then(() => {
        ws.send(JSON.stringify({ type: enums.ESocketType.Success } as types.ISocketOutMessage));

        const { message, target } = data;
        const isOnline = State.socket.isOnline(target);
        if (isOnline) State.socket.sendToUser(target, message);
      })
      .catch((err) => {
        Log.error('Socket send message error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }

  private getCharacterLocation(data: IGetCharacterLocationDto, ws: types.ISocket): void {
    const payload = new GetCharacterLocationDto(data);

    ws.reqHandler.characterLocation
      .get(payload, { userId: ws.userId, tempId: '' })
      .then((callback) => {
        ws.send(
          JSON.stringify({
            type: enums.ESocketType.Success,
            payload: { data: callback.payload },
          } as types.ISocketOutMessage),
        );
      })
      .catch((err) => {
        Log.error('Socket read message error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }

  private moveCharacter(data: IChangeCharacterLocationDto, ws: types.ISocket): void {
    const payload = new ChangeCharacterLocationDto(data);

    ws.reqHandler.characterLocation
      .change(payload, { userId: ws.userId, tempId: '' })
      .then((cb) => {
        if (cb.payload.attack) {
          this.attackEnemy(ws)
            .then((state) => {
              // #TODO This is temporary. Add some kind of system, which will update profile better, that this
              ws.profile!.state = state.state.state as enums.ECharacterState;
              ws.send(JSON.stringify({ ...state, type: enums.ESocketType.Success } as types.ISocketOutMessage));
            })
            .catch((err) => {
              Log.error('Socket read message error', err);
              ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
            });
        } else {
          ws.send(JSON.stringify({ type: enums.ESocketType.Success } as types.ISocketOutMessage));
        }
      })
      .catch((err) => {
        Log.error('Socket read message error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }

  private async attackEnemy(ws: types.ISocket): Promise<{ state: Partial<IProfileEntity> }> {
    const { reqHandler, userId, profile } = ws;

    const teams: ICreateFightDto = { teams: [[], []], attacker: undefined! };

    const attackerStats = await reqHandler.stats.get(new CharacterStatsDto({ id: profile!.stats }), {
      userId,
      tempId: '',
    });
    teams.attacker = {
      _id: userId,
      lvl: profile!.lvl,
      stats: attackerStats.payload,
    };
    const enemies = await reqHandler.npc.get(new GetCharacterDto({ page: 0, race: enums.ENpcRace.Troll, lvl: 2 }), {
      userId,
      tempId: '',
    });

    enemies.payload.forEach((u) => {
      teams.teams[1].push({
        character: u,
      });
    });

    const data = new CreateFightDto(teams);
    await reqHandler.fights.createFight(data, {
      userId,
      tempId: '',
    });
    const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Fight });
    const stateUpdate = await reqHandler.characterState.changeState(characterState, {
      userId,
      tempId: '',
    });

    return { state: stateUpdate };
  }

  private readMessage(data: types.IReadMessageBody, ws: types.ISocket): void {
    this.validator.validateReadMessage(data);

    ws.reqHandler.chat
      .read(data, { userId: ws.userId, tempId: '', type: enums.EUserTypes.User })
      .then(() => {
        ws.send(JSON.stringify({ type: enums.ESocketType.Success } as types.ISocketOutMessage));
      })
      .catch((err) => {
        Log.error('Socket read message error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }

  private getMessage(data: types.IGetMessageBody, ws: types.ISocket): void {
    this.validator.validateGetMessage(data);

    ws.reqHandler.chat
      .get(data, { userId: ws.userId, tempId: '', type: enums.EUserTypes.User })
      .then((callback) => {
        ws.send(
          JSON.stringify({
            type: enums.ESocketType.Success,
            payload: callback.payload,
          } as types.ISocketOutMessage),
        );
      })
      .catch((err) => {
        Log.error('Socket get messages error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }

  private getUnread(data: types.IGetMessageBody, ws: types.ISocket): void {
    this.validator.validateGetMessage(data);

    ws.reqHandler.chat
      .getUnread(data, { userId: ws.userId, tempId: '', type: enums.EUserTypes.User })
      .then((callback) => {
        ws.send(
          JSON.stringify({
            type: enums.ESocketType.Success,
            payload: callback.payload,
          } as types.ISocketOutMessage),
        );
      })
      .catch((err) => {
        Log.error('Socket get unread messages error', err);
        ws.send(JSON.stringify({ type: enums.ESocketType.Error, payload: err } as types.ISocketOutMessage));
      });
  }
}
