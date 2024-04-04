import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IInventoryItem } from './types.d.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type express from 'express';

export default class InventoryGetDto extends RouterFactory {
  async get(res: express.Response): Promise<IInventoryItem[]> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    return (
      await reqHandler.inventory.get({
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload.items;
  }
}
