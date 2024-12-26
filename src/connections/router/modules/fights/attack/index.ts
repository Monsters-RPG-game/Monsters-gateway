import AttackDto from '../../../../../modules/fights/subModules/attack/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAttackReq } from './types.js';
import type * as enums from '../../../../../enums/index.js';
import type { IActionEntity, IAttackEntity } from '../../../../../modules/fights/entity.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class FightRouter extends AbstractRouter<IAttackEntity> {
  async execute(
    req: IAttackReq,
    res: IResponse,
  ): Promise<{
    data: { logs: IActionEntity[]; status: enums.EFightStatus };
    state?: Partial<IProfileEntity>;
  }> {
    const dto = new AttackDto(req.body);

    return this.controller.execute(dto, res);
  }
}
