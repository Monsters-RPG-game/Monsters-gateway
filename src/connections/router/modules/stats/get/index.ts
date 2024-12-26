import GetStatsDto from '../../../../../modules/stats/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetStatsReq } from './types.js';
import type { IStatsEntity } from '../../../../../modules/stats/entity.js';

export default class StatsRouter extends AbstractRouter<IStatsEntity> {
  async execute(req: IGetStatsReq): Promise<IStatsEntity> {
    const dto = new GetStatsDto(req.query);

    return this.controller.execute(dto, req);
  }
}
