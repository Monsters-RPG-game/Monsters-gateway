import GetIntentResponseDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type express from 'express';
import { ILine } from '../types.js';

export default class StoryRouter extends RouterFactory {
  async getIntent(req: express.Request, res: express.Response): Promise<ILine> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;
    const data = new GetIntentResponseDto({ npcId: req.params.npcId!, intent: req.params.intent! });
    return (
      await reqHandler.story.getIntent(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
