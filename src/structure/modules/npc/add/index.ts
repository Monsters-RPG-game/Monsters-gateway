import AddCharacterDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddCharacterDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type express from 'express';

export default class NpcRouter extends RouterFactory {
  async add(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new AddCharacterDto(req.body as IAddCharacterDto);
    await reqHandler.npc.add(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
