import GetPartyDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IPartyEntity } from './types.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class GetPartyRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IPartyEntity> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetPartyDto(req.query.id as string);
    return (
      await reqHandler.party.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
