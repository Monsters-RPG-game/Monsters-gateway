import type DropItemDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class DropInventoryController implements types.IAbstractSubController<void> {
  async execute(data: DropItemDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.inventory.drop(data, {
      userId,
      tempId,
    });
  }
}
