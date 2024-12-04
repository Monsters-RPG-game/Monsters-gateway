import GetFightLogsDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type * as types from '../../../types/index.js';
import type { IFightLogsEntity } from '../entity.js';
import type express from 'express';

export default class FightRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IFightLogsEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController } = locals;

    const data = new GetFightLogsDto({ id: req.query.id as string });
    return (
      await reqController.fights.getLogs(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
