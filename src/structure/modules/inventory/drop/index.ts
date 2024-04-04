import InventoryDropDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IDropItemDto } from './types.d.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async delete(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new InventoryDropDto(req.body as IDropItemDto);
    await reqHandler.inventory.drop(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
