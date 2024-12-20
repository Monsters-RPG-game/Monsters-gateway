import AbstractController from '../../../../tools/abstractions/controller.js';
import type { IInventoryItem } from './types.js';
import type * as types from '../../../../types/index.js';

export default class GetInventoryController extends AbstractController<IInventoryItem[]> {
  override async execute(res: types.IResponse): Promise<IInventoryItem[]> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.inventory.get({
        userId,
        tempId,
      })
    ).payload.items;
  }
}
