import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { IPreparedMessagesBody } from './types.js';
import type * as types from '../../../connections/websocket/types/index.js';
import type { IGetUnreadMessagesDto, IUnreadMessage } from '../message/getUnread/types.js';

export default class Chat extends ReqHandler {
  async getUnread(
    data: IGetUnreadMessagesDto,
    locals: {
      tempId: string;
      userId: string | undefined;
      type: enums.EUserTypes;
    },
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IUnreadMessage[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Message,
      enums.EChatTargets.GetUnread,
      locals,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IUnreadMessage[];
    };
  }
  async send(
    data: types.ISendMessageDto,
    locals: {
      tempId: string;
      userId: string | undefined;
      type: enums.EUserTypes;
    },
  ): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Chat, enums.EChatTargets.Send, locals, data);
  }

  async read(
    data: types.IReadMessageBody,
    locals: {
      tempId: string;
      userId: string | undefined;
      type: enums.EUserTypes;
    },
  ): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Chat, enums.EChatTargets.Read, locals, data);
  }

  async get(
    data: types.IGetMessageBody,
    locals: {
      tempId: string;
      userId: string | undefined;
      type: enums.EUserTypes;
    },
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: Record<string, IPreparedMessagesBody> | types.IFullChatMessageEntity[];
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Message, enums.EChatTargets.Get, locals, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: Record<string, IPreparedMessagesBody> | types.IFullChatMessageEntity[];
    };
  }
}
