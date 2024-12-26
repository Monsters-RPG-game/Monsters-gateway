import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IFullMessageEntity } from './entity.js';
import type GetMessagesDto from './subModules/get/dto.js';
import type * as getTypes from './subModules/get/types.js';
import type GetUnreadMessagesDto from './subModules/getUnread/dto.js';
import type { IUnreadMessage } from './subModules/getUnread/types.js';
import type { IUserBrokerInfo } from '../../types/index.js';
import type ReadMessagesDto from './subModules/read/dto.js';
import type SendMessagesDto from './subModules/send/dto.js';

export default class Message extends ReqController {
  async getUnread(
    data: GetUnreadMessagesDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IUnreadMessage[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Message,
      enums.EMessagesTargets.GetUnread,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IUnreadMessage[];
    };
  }
  async send(data: SendMessagesDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Message, enums.EMessagesTargets.Send, userData, data);
  }

  async read(data: ReadMessagesDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Message, enums.EMessagesTargets.Read, userData, data);
  }

  async get(
    data: GetMessagesDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: Record<string, getTypes.IPreparedMessagesBody> | IFullMessageEntity[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Message,
      enums.EMessagesTargets.Get,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: Record<string, getTypes.IPreparedMessagesBody> | IFullMessageEntity[];
    };
  }
}
