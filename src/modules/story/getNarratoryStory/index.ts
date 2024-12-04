import GetNarratorStoryDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type * as types from '../../../types/index.js';
import type { INarratorEntity } from '../entity.js';
import type express from 'express';

export default class StoryRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<INarratorEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController } = locals;
    const data = new GetNarratorStoryDto({ id: req.query.id as string });
    return (
      await reqController.story.getNarratoryStory(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
