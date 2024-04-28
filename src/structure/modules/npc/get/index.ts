import GetCharacterDto from './dto.js';
import { EUserTypes } from '../../../../enums/index.js';
import { NoPermission } from '../../../../errors/index.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { ENpcRace } from '../../../../enums';
import type * as types from '../../../../types/index.js';
import type { ICharacterEntity } from '../entity.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ICharacterEntity[]> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler, user } = locals;

    const data = new GetCharacterDto({
      lvl: parseInt((req.query.lvl as string) ?? '0'),
      race: req.query.type as ENpcRace,
      page: parseInt((req.query.page as string) ?? '0'),
    });

    // Only admin should be allowed to fetch all data without restrictions
    if (data.lvl === undefined || (data.race === undefined && user?.type !== EUserTypes.Admin)) {
      throw new NoPermission();
    }

    return (
      await reqHandler.npc.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
