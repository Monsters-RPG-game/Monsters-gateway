import GetUserCompletionDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type express from 'express';
import { IUserCompletionEntity } from '../entity.js';

export default class StoryRouter extends RouterFactory {
  async getUserCompletion(req: express.Request, res: express.Response): Promise<IUserCompletionEntity> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;
    const data = new GetUserCompletionDto({
      userId: req.params.userId as string,
    });
    return (
      await reqHandler.story.getUserCompletion(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
