import GetNpcStoryDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type { INpcStoryEntity } from '../entity.js';
import type express from 'express';

export default class StoryRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<INpcStoryEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;
    const data = new GetNpcStoryDto({ id: req.query.id as string });
    return (
      await reqHandler.npcStory.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
