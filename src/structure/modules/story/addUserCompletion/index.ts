import AddUserCompletionDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type express from 'express';

export default class StoryRouter extends RouterFactory {
  async addUserCompletion(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;
    const data = new AddUserCompletionDto({
      userId: req.params.userId as string,
      stage: parseInt(req.params.stage as string),
      chapter: parseInt(req.params.chapter as string),
      episode: parseInt(req.params.episode as string),
    });
    return  reqHandler.story.addUserCompletion(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
