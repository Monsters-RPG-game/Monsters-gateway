import NarratorStoryDto from '../../../../../modules/story/subModules/getNarratorStory/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetNarratorStoryReq } from './types.js';
import type { INarratorStoryEntity } from '../../../../../modules/story/entity.js';

export default class StatsRouter extends AbstractRouter<INarratorStoryEntity> {
  async execute(req: IGetNarratorStoryReq): Promise<INarratorStoryEntity> {
    const dto = new NarratorStoryDto(req.query);

    return this.controller.execute(dto, req);
  }
}
