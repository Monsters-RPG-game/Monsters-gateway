import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetAllUsersDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';

export default class DebugGetAllUsersController extends AbstractController<IUserEntity[]> {
  override async execute(data: GetAllUsersDto, res: types.IResponse): Promise<IUserEntity[]> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.user.debugGetAll(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
