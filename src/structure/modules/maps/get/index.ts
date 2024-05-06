import GetMapDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IMapEntity } from './types.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IMapEntity | null> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetMapDto({ name: req.query.name as string, id: req.query.id as string });

    return (
      await reqHandler.map.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
