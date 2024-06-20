import AddSkillsDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddSkillsDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type { ISkillsEntity } from '../entity.js';
import type express from 'express';

export default class SkillsRouter extends RouterFactory {
  async add(req: express.Request, res: express.Response): Promise<ISkillsEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new AddSkillsDto(req.body as IAddSkillsDto);
    return (
      await reqHandler.skills.add(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
