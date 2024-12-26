import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IPartyEntity } from './entity.js';
import type { IUserBrokerInfo } from '../../types/index.js';
import type GetPartyDto from './subModules/get/dto.js';

export default class Party extends ReqController {
  async get(
    data: GetPartyDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IPartyEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Party,
      enums.EPartyTargets.Get,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IPartyEntity;
    };
  }
}
