import RouterFactory from '../../../tools/abstracts/router.js';
import type { IInventoryItem } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class InventoryGetDto extends RouterFactory {
  async get(res: express.Response): Promise<IInventoryItem[]> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    return (
      await reqController.inventory.get({
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload.items;
  }
}
