import RemoveAccountDto from '../../../../../modules/users/subModules/removeAccount/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IRemoveAccountReq } from './types.js';

export default class UserRouter extends AbstractRouter<void> {
  async execute(req: IRemoveAccountReq): Promise<void> {
    const dto = new RemoveAccountDto(req.query);

    return this.controller.execute(dto, req);
  }
}
