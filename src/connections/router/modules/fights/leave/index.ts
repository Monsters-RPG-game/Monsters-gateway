import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { ILeaveFightReq } from './types.js';
import type { IProfileEntity } from '../../../../../modules/profile/entity.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class FightRouter extends AbstractRouter<{ state: Partial<IProfileEntity> }> {
  override async execute(_req: ILeaveFightReq, res: IResponse): Promise<{ state: Partial<IProfileEntity> }> {
    return this.controller.execute(res);
  }
}
