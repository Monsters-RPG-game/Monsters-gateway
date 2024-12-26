import AddSingleSkillDto from '../../../../../modules/singleSkill/subModules/add/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAddSingleSkillReq } from './types.js';
import type { ISingleSkillEntity } from '../../../../../modules/singleSkill/entity.js';

export default class SingleSkillRouter extends AbstractRouter<ISingleSkillEntity> {
  async execute(req: IAddSingleSkillReq): Promise<ISingleSkillEntity> {
    const dto = new AddSingleSkillDto(req.body);

    return this.controller.execute(dto, req);
  }
}
