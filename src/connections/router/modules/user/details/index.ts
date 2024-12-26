import UserDetailsDto from '../../../../../modules/users/subModules/details/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IUserDetailsReq } from './types.js';
import type { IUserEntity } from '../../../../../modules/users/entity.js';

export default class UserRouter extends AbstractRouter<IUserEntity> {
  async execute(req: IUserDetailsReq): Promise<IUserEntity> {
    const dto = new UserDetailsDto(req.query);

    return this.controller.execute(dto, req);
  }
}
