import GetLogDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type { ILogEntity } from '../entity.d.js';
import type express from 'express';

export default class GetLogsRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ILogEntity> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    return (
      await reqHandler.log.get(new GetLogDto(req.query.lastId as string | undefined), {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
