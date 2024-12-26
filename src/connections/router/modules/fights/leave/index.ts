import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { ILeaveFightReq } from './types.js';
import type * as types from '../../../../../types/index.js';

export default class FightRouter extends AbstractRouter<types.IProfileUpdate> {
  async execute(_req: ILeaveFightReq, res: types.IResponse): Promise<types.IProfileUpdate> {
    return this.controller.execute(res);
  }
}
