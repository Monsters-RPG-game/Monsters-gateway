import * as enums from '../../../../enums/index.js';
import * as errors from '../../../../errors/index.js';
import State from '../../../../tools/state.js';
import ChangeCharacterStatusDto from '../../../character/subModules/changeState/dto.js';
import type AttackDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IAttackEntity } from '../../entity.js';

export default class AttackController implements types.IAbstractSubController<IAttackEntity> {
  async execute(data: AttackDto, res: types.IResponse): Promise<IAttackEntity> {
    const { reqController, tempId, userId, profile } = res.locals;

    if (profile?.state !== enums.ECharacterState.Fight) {
      throw new errors.UserNotInFight();
    }

    const fightLogs = (
      await reqController.fights.attack(data, {
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
