import AttackDto from './dto.js';
import * as enums from '../../../enums/index.js';
import * as errors from '../../../errors/index.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import State from '../../../tools/state.js';
import ChangeCharacterStatusDto from '../../character/changeState/dto.js';
import type { IAttackDto } from './types.js';
import type * as types from '../../../types/index.js';
import type { IProfileEntity } from '../../profile/entity.js';
import type { IActionEntity } from '../entity.js';
import type express from 'express';

export default class FightRouter extends RouterFactory {
  async post(
    req: express.Request,
    res: express.Response,
  ): Promise<{
    data: { logs: IActionEntity[]; status: enums.EFightStatus };
    state?: Partial<IProfileEntity>;
  }> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController, profile } = locals;

    const payload = new AttackDto(req.body as IAttackDto);

    if (profile?.state !== enums.ECharacterState.Fight) {
      throw new errors.UserNotInFight();
    }

    const fightLogs = (
      await reqController.fights.attack(payload, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;

    if (fightLogs.status !== enums.EFightStatus.Ongoing) {
      const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Map });
      const stateUpdate = await reqController.characterState.changeState(characterState, {
        userId: locals.userId,
        tempId: locals.tempId,
      });

      State.socket.updateState(locals.userId as string);
      return { data: fightLogs, state: stateUpdate };
    }

    return { data: fightLogs };
  }
}
