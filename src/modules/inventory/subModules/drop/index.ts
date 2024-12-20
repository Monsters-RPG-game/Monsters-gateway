import AbstractController from '../../../../tools/abstractions/controller.js';
import type DropItemDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class DropInventoryController extends AbstractController<void> {
  override async execute(data: DropItemDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.inventory.drop(data, {
      userId,
      tempId,
    });
  }
}
