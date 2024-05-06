import GetCharacterLocationDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { ICharacterLocationEntity } from './types.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class GetCharacterLocationRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ICharacterLocationEntity | null> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetCharacterLocationDto({ character: req.query.character as string, id: req.query.id as string });

    return (
      await reqHandler.characterLocation.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
