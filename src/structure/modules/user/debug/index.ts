import DebugGetAllUsersDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type { IUserEntity } from '../entity.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IUserEntity[]> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new DebugGetAllUsersDto(parseInt(req.query.page as string));
    return (
      await reqHandler.user.debugGetAll(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
