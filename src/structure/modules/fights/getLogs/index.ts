import GetFightLogsDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.d.js';
import type { IFightLogsEntity } from '../entity.d.js';
import type express from 'express';

export default class FightRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IFightLogsEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetFightLogsDto({ id: req.query.id as string });
    return (
      await reqHandler.fights.getLogs(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
