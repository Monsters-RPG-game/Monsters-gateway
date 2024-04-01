import InventoryUseDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IUseItemDto } from './types.d.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new InventoryUseDto(req.body as IUseItemDto);
    await reqHandler.inventory.use(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
