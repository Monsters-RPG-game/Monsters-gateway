import InventoryDropDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IUnreadMessage } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IUnreadMessage[]> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new InventoryDropDto(Number(req.query.page));
    return (
      await reqController.message.getUnread(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
