import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type AddLogDto from './add/dto.js';
import type { ILogEntity } from './entity.d.js';
import type GetLogsDto from './get/dto.js';
import type { IUserBrokerInfo } from '../../../types/index.d.js';

export default class Logs extends ReqHandler {
  async get(
    data: GetLogsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ILogEntity;
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Log, enums.ELogTargets.GetLog, userData, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ILogEntity;
    };
  }

  async add(
    data: AddLogDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: { _id: string };
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Log, enums.ELogTargets.AddLog, userData, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: { _id: string };
    };
  }
}
