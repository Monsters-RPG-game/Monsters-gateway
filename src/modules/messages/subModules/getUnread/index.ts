import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetUnreadMessagesDto from './dto.js';
import type { IUnreadMessage } from './types.js';
import type * as types from '../../../../types/index.js';

export default class GetUnreadMessagesController extends AbstractController<IUnreadMessage[]> {
  override async execute(data: GetUnreadMessagesDto, res: types.IResponse): Promise<IUnreadMessage[]> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.message.getUnread(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
