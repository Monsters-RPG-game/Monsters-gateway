import GetFightLogsDto from '../../../../../modules/fights/subModules/getLogs/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetFightLogsReq } from './types.js';
import type { IFightLogsEntity } from '../../../../../modules/fights/entity.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class FightRouter extends AbstractRouter<IFightLogsEntity> {
  async execute(req: IGetFightLogsReq, res: IResponse): Promise<IFightLogsEntity> {
    const dto = new GetFightLogsDto(req.body);

    return this.controller.execute(dto, res);
  }
}
