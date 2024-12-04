import InventoryDropDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IDropItemDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async delete(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new InventoryDropDto(req.body as IDropItemDto);
    await reqController.inventory.drop(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
