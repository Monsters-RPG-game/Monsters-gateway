import GetNpcStoryDto from '../../../../../modules/story/subModules/getNpcStory/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetNpcStoryReq } from './types.js';
import type { INpcStoryEntity } from '../../../../../modules/story/entity.js';

export default class StatsRouter extends AbstractRouter<INpcStoryEntity> {
  override async execute(req: IGetNpcStoryReq): Promise<INpcStoryEntity> {
    const dto = new GetNpcStoryDto(req.query);

    return this.controller.execute(dto, req);
  }
}
