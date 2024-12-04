import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import type * as getTypes from './get/types.js';
import type { IUnreadMessage } from './getUnread/types.js';
import type GetMessagesDto from '../../modules/message/get/dto.js';
import type GetUnreadMessagesDto from '../../modules/message/getUnread/dto.js';
import type ReadMessagesDto from '../../modules/message/read/dto.js';
import type SendMessagesDto from '../../modules/message/send/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';

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
    payload: Record<string, getTypes.IPreparedMessagesBody> | getTypes.IFullMessageEntity[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Message,
      enums.EMessagesTargets.Get,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: Record<string, getTypes.IPreparedMessagesBody> | getTypes.IFullMessageEntity[];
    };
  }
}
