import DebugDto from '../../../../../modules/users/subModules/debug/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IDebugReq } from './types.js';
import type { IUserEntity } from '../../../../../modules/users/entity.js';

export default class UserRouter extends AbstractRouter<IUserEntity[]> {
  override async execute(req: IDebugReq): Promise<IUserEntity[]> {
    const dto = new DebugDto(req.query);

    return this.controller.execute(dto, req);
  }
}
