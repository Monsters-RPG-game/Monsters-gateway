import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import type AddProfileDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';

export default class AddProfileController extends AbstractController<{ state: Partial<IProfileEntity> }> {
  override async execute(data: AddProfileDto, res: types.IResponse): Promise<{ state: Partial<IProfileEntity> }> {
    const { reqController, tempId, userId, user, profile } = res.locals;

    await reqController.profile.add(data, { userId, tempId });

    await State.redis.addCachedUser({
      account: user!,
      profile: { ...profile!, initialized: true },
    });

    return { state: { initialized: true, race: data.race } };
  }
}
