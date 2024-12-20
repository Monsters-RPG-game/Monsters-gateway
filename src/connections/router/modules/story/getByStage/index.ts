import GetByStageDto from '../../../../../modules/story/subModules/getByStage/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetByStageReq } from './types.js';
import type { IChapter } from '../../../../../modules/story/types.js';

export default class StoryRouter extends AbstractRouter<IChapter> {
  override async execute(req: IGetByStageReq): Promise<IChapter> {
    const dto = new GetByStageDto(req.query);

    return this.controller.execute(dto, req);
  }
}
