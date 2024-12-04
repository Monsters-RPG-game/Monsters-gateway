import CreateMapDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { ICreateMapDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async create(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new CreateMapDto(req.body as ICreateMapDto);

    await reqController.map.create(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
