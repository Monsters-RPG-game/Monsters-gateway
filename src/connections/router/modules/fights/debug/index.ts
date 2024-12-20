import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IDebugReq } from './types.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';

export default class DebugRouter extends AbstractRouter<{ state: Partial<IProfileEntity> }> {
  override async execute(req: IDebugReq): Promise<{ state: Partial<IProfileEntity> }> {
    return this.controller.execute(req.body, req);
  }
}
