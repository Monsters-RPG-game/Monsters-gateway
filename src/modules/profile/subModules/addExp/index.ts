import State from '../../../../tools/state.js';
import type AddExpDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileUpdate } from '../../../../types/responses.js';

export default class AddExpController implements types.IAbstractSubController<IProfileUpdate> {
  async execute(data: AddExpDto, res: types.IResponse): Promise<IProfileUpdate> {
    const { reqController, tempId, userId } = res.locals;

    const profile = await reqController.profile.addExp(data, {
      userId,
      tempId,
    });

    await State.redis.updateCachedUser(profile.payload.user, { profile: profile.payload });
    return { state: profile.payload };
  }
}
