import GetByIntentDto from '../../../../../modules/story/subModules/getByIntent/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetByIntentReq } from './types.js';
import type { ILine } from '../../../../../modules/story/types.js';

export default class StoryRouter extends AbstractRouter<ILine> {
  override async execute(req: IGetByIntentReq): Promise<ILine> {
    const dto = new GetByIntentDto(req.query);

    return this.controller.execute(dto, req);
  }
}
