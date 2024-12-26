import AddExpDto from '../../../../../modules/profile/subModules/addExp/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAddExpReq } from './types.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';

export default class AddExpRouter extends AbstractRouter<{ state: Partial<IProfileEntity> }> {
  async execute(req: IAddExpReq): Promise<{ state: Partial<IProfileEntity> }> {
    const dto = new AddExpDto(req.body);

    return this.controller.execute(dto, req);
  }
}
