import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { IPartyEntity } from './get/types.d.js';
import type { IUserBrokerInfo } from '../../../types/index.d.js';
import type GetPartyDto from '../../modules/party/get/dto.js';

export default class Party extends ReqHandler {
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
