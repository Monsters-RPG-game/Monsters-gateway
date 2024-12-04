import GetMapDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IUsersTokens } from '../../../types/index.js';
import type { IMapEntity } from '../entity.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IMapEntity | null> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new GetMapDto({ name: req.query.name as string, id: req.query.id as string });

    return (
      await reqController.map.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
