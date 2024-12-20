import GetProfileDto from './dto.js';
import { NoUserWithProvidedName } from '../../../../errors/index.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import UserDetailsDto from '../../../users/subModules/details/dto.js';
import type * as types from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';

export default class GetProfileController extends AbstractController<IProfileEntity> {
  override async execute(data: GetProfileDto, res: types.IResponse): Promise<IProfileEntity> {
    const { reqController, tempId, userId } = res.locals;

    if (res.locals?.user?.login === (data.name as string)) {
      return res.locals.profile as IProfileEntity;
    }

    const users = await reqController.user.getDetails([new UserDetailsDto({ name: data.name as string })], {
      userId,
      tempId,
    });

    if (!users || users.payload.length === 0) {
      throw new NoUserWithProvidedName();
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
