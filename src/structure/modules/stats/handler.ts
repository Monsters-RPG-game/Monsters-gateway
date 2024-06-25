import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { IStatsEntity } from './entity.js';
import type CharacterStatsDto from './get/dto.js';
import type * as types from '../../../types/index.js';

export default class User extends ReqHandler {
  async get(
    data: CharacterStatsDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IStatsEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Stats,
      enums.EStatsTargets.GetStats,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IStatsEntity;
    };
  }
}
