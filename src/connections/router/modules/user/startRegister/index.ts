import StartRegisterDto from '../../../../../modules/users/subModules/startRegister/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IStartRegisterReq } from './types.js';

export default class UserRouter extends AbstractRouter<string> {
  async execute(req: IStartRegisterReq): Promise<string> {
    const dto = new StartRegisterDto(req.query);

    return this.controller.execute(dto, req);
  }
}
