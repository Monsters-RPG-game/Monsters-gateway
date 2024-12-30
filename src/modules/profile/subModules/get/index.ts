import GetProfileDto from './dto.js';
import UserDetailsDto from '../../../users/subModules/details/dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';

export default class GetProfileController implements types.IAbstractSubController<IProfileEntity | null> {
  async execute(data: GetProfileDto, res: types.IResponse): Promise<IProfileEntity | null> {
    const { reqController, tempId, userId } = res.locals;

    if (data.name && res.locals?.user?.login === data.name) {
      return res.locals.profile as IProfileEntity;
    }

    const users = await reqController.user.getDetails([new UserDetailsDto({ name: data?.name, id: data?.id })], {
      userId,
      tempId,
    });

    if (
      !users?.payload ||
      users.payload.length === 0 ||
      (typeof users.payload === 'object' && Object.keys(users.payload).length === 0)
    ) {
      return null;
    }

    const user = users.payload[0]!;
    const profileDto = new GetProfileDto({ id: user._id as string });

    return (
      await reqController.profile.get(profileDto, {
        userId,
        tempId,
      })
    ).payload;
  }
}
