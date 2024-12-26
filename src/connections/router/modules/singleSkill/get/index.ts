import GetSingleSkillDto from '../../../../../modules/singleSkill/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetSingleSkillReq } from './types.js';
import type { ISingleSkillEntity } from '../../../../../modules/singleSkill/entity.js';

export default class SkillsRouter extends AbstractRouter<ISingleSkillEntity> {
  async execute(req: IGetSingleSkillReq): Promise<ISingleSkillEntity> {
    const dto = new GetSingleSkillDto(req.query);

    return this.controller.execute(dto, req);
  }
}
