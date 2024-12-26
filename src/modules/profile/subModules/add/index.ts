import State from '../../../../tools/state.js';
import type AddProfileDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileUpdate } from '../../../../types/responses.js';

export default class AddProfileController implements types.IAbstractSubController<IProfileUpdate> {
  async execute(data: AddProfileDto, res: types.IResponse): Promise<IProfileUpdate> {
    const { reqController, tempId, userId, user, profile } = res.locals;

    await reqController.profile.add(data, { userId, tempId });

    await State.redis.addCachedUser({
      account: user!,
      profile: { ...profile!, initialized: true },
    });

    return { state: { initialized: true, race: data.race } };
  }
}
