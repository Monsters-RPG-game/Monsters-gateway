import GetSkillsDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type { ISkillsEntity } from '../entity.js';
import type express from 'express';

export default class SkillsRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<ISkillsEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    console.log('asda')
    const data = new GetSkillsDto(req.query.id as string);
console.log('------')
    return (
      await reqHandler.skills.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
