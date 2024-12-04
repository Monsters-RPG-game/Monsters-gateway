import GetDetailedSkillsDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { ISkillsEntityDetailed } from './types.js';
import type * as types from '../../../types/index.js';
import type express from 'express';

export default class SkillsRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ISkillsEntityDetailed> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController } = locals;

    const data = new GetDetailedSkillsDto(req.query.id as string);
    return (
      await reqController.skills.getDetailed(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
