import AbstractController from '../../../../tools/abstractions/controller.js';
import type ReadMessagesDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class ReadMessagesController extends AbstractController<void> {
  override async execute(data: ReadMessagesDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.message.read(data, { userId, tempId });
  }
}
