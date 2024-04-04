import CreateFightDto from './dto.js';
import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import ChangeCharacterStatusDto from '../../character/changeState/dto.js';
import UserDetailsDto from '../../user/details/dto.js';
import type { ICreateFight, ICreateFightDto } from './types.d.js';
import type * as types from '../../../../types/index.d.js';
import type { IProfileEntity } from '../../profile/entity.d.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler, user, profile } = locals;

    const teams: ICreateFightDto = { teams: [[], []], attacker: profile?.user as string };
    const body = req.body as ICreateFight;

    if (!body.team || body.team.length === 0) {
      throw new errors.ElementTooShortError('teams', 1);
    }
    if (body.team.includes(user?.login as string)) throw new errors.ActionNotAllowed();

    const preparedNames = body.team.map((character) => {
      return new UserDetailsDto({ name: character });
    });
    const users = await reqHandler.user.getDetails(preparedNames, {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    if (users.payload.length !== body.team.length) {
      const dbUsers = users.payload.map((u) => u.login);
      const nonExistingUsers = body.team.filter((u) => !dbUsers.includes(u));
      throw new errors.NoUserWithProvidedName(nonExistingUsers);
    }

    users.payload.forEach((u) => {
      teams.teams[1].push({
        character: u._id,
      });
    });

    const data = new CreateFightDto(teams);
    await reqHandler.fights.createFight(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
    const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Fight });
    const stateUpdate = await reqHandler.characterState.changeState(characterState, {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    return { state: stateUpdate };
  }
}
