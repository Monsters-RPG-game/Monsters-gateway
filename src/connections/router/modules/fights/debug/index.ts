import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IDebugReq } from './types.js';
import type { IResponse } from '../../../../../types/requests.js';
import type { IProfileUpdate } from '../../../../../types/responses.js';

export default class DebugRouter extends AbstractRouter<IProfileUpdate> {
  async execute(req: IDebugReq, res: IResponse): Promise<IProfileUpdate> {
    return this.controller.execute(req.body, res);
  }
}
