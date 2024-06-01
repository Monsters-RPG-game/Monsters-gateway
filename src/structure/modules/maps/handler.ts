import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type CreateMapDto from './create/dto.js';
import type { IMapEntity } from './entity.js';
import type GetMapsDto from './get/dto.js';
import type UpdateMapDto from './update/dto.js';
import type { IUserBrokerInfo } from '../../../types/index.js';

export default class Message extends ReqHandler {
  async update(data: UpdateMapDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Map, enums.EMapTargets.Update, userData, data);
  }

  async create(data: CreateMapDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Map, enums.EMapTargets.Create, userData, data);
  }

  async get(
    data: GetMapsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IMapEntity | null;
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Map, enums.EMapTargets.Get, userData, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IMapEntity | null;
    };
  }
}
