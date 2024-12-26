import FinishRegisterDto from '../../../../../modules/users/subModules/finishRegister/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IFinishRegisterReq } from './types.js';

export default class UserRouter extends AbstractRouter<string> {
  async execute(req: IFinishRegisterReq): Promise<string> {
    const dto = new FinishRegisterDto(req.query);

    return this.controller.execute(dto, req);
  }
}
