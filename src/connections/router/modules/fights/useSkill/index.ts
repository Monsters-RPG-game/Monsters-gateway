import UseSkillDto from '../../../../../modules/fights/subModules/useSkill/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IUseSkillReq } from './types.js';
import type * as enums from '../../../../../enums/index.js';
import type { IActionEntity } from '../../../../../modules/fights/entity.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';

export default class FightRouter extends AbstractRouter<{
  data: { logs: IActionEntity[]; status: enums.EFightStatus };
  state?: Partial<IProfileEntity>;
}> {
  override async execute(req: IUseSkillReq): Promise<{
    data: { logs: IActionEntity[]; status: enums.EFightStatus };
    state?: Partial<IProfileEntity>;
  }> {
    const dto = new UseSkillDto(req.body);

    return this.controller.execute(dto, req);
  }
}
