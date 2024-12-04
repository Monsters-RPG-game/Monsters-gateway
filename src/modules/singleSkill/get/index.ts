import GetSingleSkillDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type * as types from '../../../types/index.js';
import type { ISingleSkillEntity } from '../entity.js';
import type express from 'express';

export default class SkillsRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ISingleSkillEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController } = locals;

    const data = new GetSingleSkillDto(req.query.id as string);
    return (
      await reqController.singleSkill.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
