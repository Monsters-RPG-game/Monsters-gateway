import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IStatsEntity } from './entity.js';
import type CharacterStatsDto from './subModules/get/dto.js';
import type * as types from '../../types/index.js';

export default class Stats extends ReqController {
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
