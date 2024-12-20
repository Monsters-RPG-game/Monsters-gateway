import GetDetailedSkillsDto from '../../../../../modules/skills/subModules/getDetailed/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetDetailedSkillsReq } from './types.js';
import type { IDetailedSkillsEntity } from '../../../../../modules/skills/entity.js';

export default class StatsRouter extends AbstractRouter<IDetailedSkillsEntity> {
  override async execute(req: IGetDetailedSkillsReq): Promise<IDetailedSkillsEntity> {
    const dto = new GetDetailedSkillsDto(req.query);

    return this.controller.execute(dto, req);
  }
}
