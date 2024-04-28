import CreateFightDto from './dto.js';
import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import ChangeCharacterStatusDto from '../../character/changeState/dto.js';
import GetCharacterDto from '../../npc/get/dto.js';
import CharacterStatsDto from '../../stats/get/dto.js';
import type { ICreateFight, ICreateFightDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../profile/entity.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler, user, profile } = locals;

    const teams: ICreateFightDto = { teams: [[], []], attacker: undefined! };
    const body = req.body as ICreateFight;

    if (!body.team || body.team.length === 0) {
      throw new errors.ElementTooShortError('teams', 1);
    }
    if (body.team.includes(user?._id as string)) throw new errors.ActionNotAllowed();

    const attackerStats = await reqHandler.stats.get(new CharacterStatsDto({ id: profile!.stats }), {
      userId: locals.userId,
      tempId: locals.tempId,
    });
    teams.attacker = {
      _id: user!._id,
      lvl: profile!.lvl,
      stats: attackerStats.payload,
    };
    const enemies = await reqHandler.npc.get(new GetCharacterDto({ page: 0, id: body.team }), {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    if (enemies.payload.length !== body.team.length) {
      const dbEnemies = enemies.payload.map((u) => u._id);
      const nonExistingUsers = body.team.filter((u) => !dbEnemies.includes(u));
      throw new errors.NoNpcWithProvidedId(nonExistingUsers);
    }

    enemies.payload.forEach((u) => {
      teams.teams[1].push({
        character: u,
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
