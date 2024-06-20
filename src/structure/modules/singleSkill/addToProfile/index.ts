import AddToProfileDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddToProfileDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type { ISingleSkillEntity } from '../entity.js';
import type express from 'express';

export default class SkillsRouter extends RouterFactory {
  async addToProfile(req: express.Request, res: express.Response): Promise<ISingleSkillEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new AddToProfileDto(req.body as IAddToProfileDto);
    return (
      await reqHandler.singleSkill.addToProfile(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
