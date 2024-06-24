import AddSingleSkillDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddSingleSkillDto } from './types.js';
import type * as types from '../../../../types/index.js';
import type { ISingleSkillEntity } from '../entity.js';
import type express from 'express';

export default class SingleSkillRouter extends RouterFactory {
  async add(req: express.Request, res: express.Response): Promise<ISingleSkillEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new AddSingleSkillDto(req.body as IAddSingleSkillDto);
    return (
      await reqHandler.singleSkill.add(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
