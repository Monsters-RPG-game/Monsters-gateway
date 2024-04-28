import CharacterStatsDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type { IStatsEntity } from '../entity.js';
import type express from 'express';

export default class GetStatsRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IStatsEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new CharacterStatsDto({ id: req.query.id as string });
    return (
      await reqHandler.stats.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
