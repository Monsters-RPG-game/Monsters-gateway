import type GetAllUsersDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';

export default class GetAllUsersController implements types.IAbstractSubController<IUserEntity> {
  async execute(data: GetAllUsersDto, res: types.IResponse): Promise<IUserEntity> {
    const { reqController, userId, tempId } = res.locals;

    return (
      await reqController.user.getDetails([data], {
        userId,
        tempId,
      })
    ).payload[0]!;
  }
}
