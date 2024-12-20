import CreateFightDto from './dto.js';
import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import ChangeCharacterStatusDto from '../../../character/subModules/changeState/dto.js';
import GetCharacterDto from '../../../npc/subModules/get/dto.js';
import CharacterStatsDto from '../../../stats/subModules/get/dto.js';
import type { ICreateFight, ICreateFightDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../../profile/entity.js';

export default class DebugFightsController extends AbstractController<{ state: Partial<IProfileEntity> }> {
  override async execute(data: ICreateFight, res: types.IResponse): Promise<{ state: Partial<IProfileEntity> }> {
    const { reqController, tempId, userId, profile } = res.locals;

    const teams: ICreateFightDto = {
      teams: [[], []],
      attacker: undefined!,
      skills: { _id: '', owner: '', singleSkills: [] },
    };

    if (!data.team || data.team.length === 0) {
      throw new errors.ElementTooShortError('teams', 1);
    }
    if (data.team.includes(userId as string)) throw new errors.ActionNotAllowed();

    const attackerStats = await reqController.stats.get(new CharacterStatsDto({ id: profile!.stats }), {
      userId,
      tempId,
    });
    teams.attacker = {
      _id: userId!,
      lvl: profile!.lvl,
      stats: attackerStats.payload,
    };
    const enemies = await reqController.npc.get(new GetCharacterDto({ page: 0, id: data.team }), {
      userId,
      tempId,
    });

    if (enemies.payload.length !== data.team.length) {
      const dbEnemies = enemies.payload.map((u) => u._id);
      const nonExistingUsers = data.team.filter((u) => !dbEnemies.includes(u));
      throw new errors.NoNpcWithProvidedId(nonExistingUsers);
    }

    enemies.payload.forEach((u) => {
      teams.teams[1].push({
        character: u,
      });
    });

    const createFightDto = new CreateFightDto(teams);
    await reqController.fights.createFight(createFightDto, {
      userId,
      tempId,
    });
    const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Fight });
    const stateUpdate = await reqController.characterState.changeState(characterState, {
      userId,
      tempId,
    });

    State.socket.updateState(userId as string);
    return { state: stateUpdate };
  }
}
