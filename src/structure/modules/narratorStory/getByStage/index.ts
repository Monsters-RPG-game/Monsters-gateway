import GetByStageNarratorStoryDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type * as types from '../../../../types/index.js';
import type { IChapter } from '../types.js';
import type express from 'express';

export default class StoryRouter extends RouterFactory {
  async getByStage(req: express.Request, res: express.Response): Promise<IChapter & { _id: string }> {
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;
    const data = new GetByStageNarratorStoryDto({
      stageNumber: parseInt(req.params.stage as string),
      chapterNumber: parseInt(req.params.chapter as string),
      episodeNumber: parseInt(req.params.episode as string),
    });
    return (
      await reqHandler.narratorStory.getByStage(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
  }
}
