import type ItemUseDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class UseInventoryController implements types.IAbstractSubController<void> {
  async execute(data: ItemUseDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.inventory.use(data, { userId, tempId });
  }
}
