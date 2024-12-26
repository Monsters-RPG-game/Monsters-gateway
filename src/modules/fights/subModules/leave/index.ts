import { ECharacterState } from '../../../../enums/user.js';
import State from '../../../../tools/state.js';
import ChangeCharacterStatusDto from '../../../character/subModules/changeState/dto.js';
import type * as types from '../../../../types/index.js';

export default class LeaveFightController implements types.IAbstractSubController<types.IProfileUpdate> {
  async execute(res: types.IResponse): Promise<types.IProfileUpdate> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.fights.leaveFight(null, {
      userId,
      tempId,
    });
    const characterState = new ChangeCharacterStatusDto({ state: ECharacterState.Map });
    const stateUpdate = await reqController.characterState.changeState(characterState, {
      userId,
      tempId,
    });

    State.socket.updateState(userId as string);
    return { state: stateUpdate };
  }
}
