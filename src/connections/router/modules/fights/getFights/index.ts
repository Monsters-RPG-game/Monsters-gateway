import GetFightDto from '../../../../../modules/fights/subModules/getFight/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetFightReq } from './types.js';
import type { IFight } from '../../../../../modules/fights/entity.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class FightRouter extends AbstractRouter<IFight[]> {
  override async execute(req: IGetFightReq, res: IResponse): Promise<IFight[]> {
    const dto = new GetFightDto(req.body, res.locals.userId as string);

    return this.controller.execute(dto, res);
  }
}
