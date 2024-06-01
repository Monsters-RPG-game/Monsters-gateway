import { ECharacterState } from '../../../../enums/index.js';
import State from '../../../../state.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import ChangeCharacterStatusDto from '../../character/changeState/dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../profile/entity.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async get(_req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    await reqHandler.fights.leaveFight(null, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
    const characterState = new ChangeCharacterStatusDto({ state: ECharacterState.Map });
    const stateUpdate = await reqHandler.characterState.changeState(characterState, {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    State.socket.updateState(locals.userId as string);
    return { state: stateUpdate };
  }
}
