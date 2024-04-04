import AttackDto from './dto.js';
import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import ChangeCharacterStatusDto from '../../character/changeState/dto.js';
import UserDetailsDto from '../../user/details/dto.js';
import type { IAttackDto } from './types.d.js';
import type * as types from '../../../../types/index.d.js';
import type { IProfileEntity } from '../../profile/entity.d.js';
import type { IActionEntity } from '../entity.d.js';
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
    const { reqHandler, profile } = locals;

    const body = req.body as IAttackDto;
    if (!body.target) throw new errors.MissingArgError('target');

    const users = await reqHandler.user.getDetails([new UserDetailsDto({ name: body.target })], {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    if (profile?.state !== enums.ECharacterState.Fight) {
      throw new errors.UserNotInFight();
    }

    if (users.payload.length === 0) {
      throw new errors.NoUserWithProvidedName([body.target]);
    }

    let { payload } = await reqHandler.fights.attack(new AttackDto({ target: users.payload[0]?._id as string }), {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    payload = await this.prepareLogs(payload, locals);

    if (payload.status !== enums.EFightStatus.Ongoing) {
      const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Map });
      const stateUpdate = await reqHandler.characterState.changeState(characterState, {
        userId: locals.userId,
        tempId: locals.tempId,
      });

      return { data: payload, state: stateUpdate };
    }

    return { data: payload };
  }

  private async prepareLogs(
    data: { logs: IActionEntity[]; status: enums.EFightStatus },
    locals: types.IUsersTokens,
  ): Promise<{ logs: IActionEntity[]; status: enums.EFightStatus }> {
    const { reqHandler } = locals;
    const ids: string[] = data.logs.map((l) => [l.character, l.target]).flat();

    const users = (
      await reqHandler.user.getDetails(
        ids.map((id) => new UserDetailsDto({ id })),
        {
          userId: locals.userId,
          tempId: locals.tempId,
        },
      )
    ).payload;

    // #TODO This code assumes that enemy will have existing profile ( will be another user ). This WILL NOT work for bots
    return {
      status: data.status,
      logs: data.logs.map((l) => {
        return {
          ...l,
          character: users.find((user) => user._id === l.character)?.login as string,
          target: users.find((user) => user._id === l.target)?.login as string,
        };
      }),
    };
  }
}
