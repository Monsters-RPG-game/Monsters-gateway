import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import ChangeCharacterStatusDto from '../../../character/subModules/changeState/dto.js';
import type UseSkillDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../../profile/entity.js';
import type { IActionEntity } from '../../entity.js';

export default class UseSkillController extends AbstractController<{
  data: { logs: IActionEntity[]; status: enums.EFightStatus };
  state?: Partial<IProfileEntity>;
}> {
  override async execute(
    data: UseSkillDto,
    res: types.IResponse,
  ): Promise<{
    data: { logs: IActionEntity[]; status: enums.EFightStatus };
    state?: Partial<IProfileEntity>;
  }> {
    const { reqController, tempId, userId, profile } = res.locals;

    if (profile?.state !== enums.ECharacterState.Fight) {
      throw new errors.UserNotInFight();
    }

    const fightLogs = (
      await reqController.fights.useSkill(data, {
        userId,
        tempId,
      })
    ).payload;

    if (fightLogs.status !== enums.EFightStatus.Ongoing) {
      const characterState = new ChangeCharacterStatusDto({ state: enums.ECharacterState.Map });
      const stateUpdate = await reqController.characterState.changeState(characterState, {
        userId,
        tempId,
      });

      State.socket.updateState(userId as string);
      return { data: fightLogs, state: stateUpdate };
    }

    return { data: fightLogs };
  }
}
