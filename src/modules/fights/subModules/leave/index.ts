import { ECharacterState } from '../../../../enums/user.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import ChangeCharacterStatusDto from '../../../character/subModules/changeState/dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../../profile/entity.js';

export default class LeaveFightController extends AbstractController<{ state: Partial<IProfileEntity> }> {
  override async execute(res: types.IResponse): Promise<{ state: Partial<IProfileEntity> }> {
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
