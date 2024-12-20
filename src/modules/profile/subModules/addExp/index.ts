import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import type AddExpDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';

export default class AddExpController extends AbstractController<{ state: Partial<IProfileEntity> }> {
  override async execute(data: AddExpDto, res: types.IResponse): Promise<{ state: Partial<IProfileEntity> }> {
    const { reqController, tempId, userId } = res.locals;

    const profile = await reqController.profile.addExp(data, {
      userId,
      tempId,
    });

    await State.redis.updateCachedUser(profile.payload.user, { profile: profile.payload });
    return { state: profile.payload };
  }
}
