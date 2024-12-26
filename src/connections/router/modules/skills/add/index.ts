import AddSkillsDto from '../../../../../modules/skills/subModules/add/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAddSkillsReq } from './types.js';
import type { ISkillsEntity } from '../../../../../modules/skills/entity.js';

export default class SkillsRouter extends AbstractRouter<ISkillsEntity> {
  async execute(req: IAddSkillsReq): Promise<ISkillsEntity> {
    const dto = new AddSkillsDto(req.body);

    return this.controller.execute(dto, req);
  }
}
