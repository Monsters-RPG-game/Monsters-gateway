import GetSkillsDto from '../../../../../modules/skills/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetSkillsReq } from './types.js';
import type { ISkillsEntity } from '../../../../../modules/skills/entity.js';

export default class SkillsRouter extends AbstractRouter<ISkillsEntity> {
  override async execute(req: IGetSkillsReq): Promise<ISkillsEntity> {
    const dto = new GetSkillsDto(req.query);

    return this.controller.execute(dto, req);
  }
}
