import GetProfileDto from '../../../../../modules/profile/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetProfileReq } from './types.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class GetProfileRouter extends AbstractRouter<IProfileEntity> {
  async execute(req: IGetProfileReq, res: IResponse): Promise<IProfileEntity> {
    const dto = new GetProfileDto(req.body);

    return this.controller.execute(dto, res);
  }
}
