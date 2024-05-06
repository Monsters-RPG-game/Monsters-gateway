import GetMapDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type { IMapEntity } from '../get/types.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetMapDto(req.body as Partial<Omit<IMapEntity, '_id'>>, req.params.id as string);

    await reqHandler.map.update(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
