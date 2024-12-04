import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import type { IPartyEntity } from './get/types.js';
import type GetPartyDto from '../../modules/party/get/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';

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
