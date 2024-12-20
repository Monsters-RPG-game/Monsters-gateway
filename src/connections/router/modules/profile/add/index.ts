import AddProfileDto from '../../../../../modules/profile/subModules/add/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAddProfileReq } from './types.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';

export default class AddProfileRouter extends AbstractRouter<{ state: Partial<IProfileEntity> }> {
  override async execute(req: IAddProfileReq): Promise<{ state: Partial<IProfileEntity> }> {
    const dto = new AddProfileDto(req.body);

    return this.controller.execute(dto, req);
  }
}
