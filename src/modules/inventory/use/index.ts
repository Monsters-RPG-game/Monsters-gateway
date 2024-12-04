import InventoryUseDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IUseItemDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new InventoryUseDto(req.body as IUseItemDto);
    await reqController.inventory.use(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
