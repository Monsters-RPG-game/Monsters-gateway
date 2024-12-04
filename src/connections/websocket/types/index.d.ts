import type { IGetMessageDto, IReadMessageDto } from './dto.js';
import type ReqController from '../../../connections/router/reqController.js';
import type * as enums from '../../../enums/index.js';
import type { IProfileEntity } from '../../../modules/profile/entity.js';
import type { WebSocket } from 'ws';

export interface ISendMessageDto {
  body: string;
  receiver: string;
  sender: string;
}

export interface ISocketPayload {
  [enums.EMessageSubTargets.Send]: ISendMessageDto;
  [enums.EMessageSubTargets.Get]: IGetMessageDto;
  [enums.EMessageSubTargets.Read]: IReadMessageDto;
  [enums.EMessageSubTargets.GetUnread]: IGetMessageDto;
}

export interface ISocket extends WebSocket {
  ttl?: NodeJS.Timeout;
  userId: string;
  validated: boolean;
  reqController: ReqController;
  profile: IProfileEntity | undefined;
}

export interface ISocketSubTargets {
  [enums.ESocketTargets.Chat]: enums.EMessageSubTargets;
  [enums.ESocketTargets.Movement]: undefined;
  [enums.ESocketTargets.Authorization]: undefined;
}

export interface ISocketInMessage {
  target: enums.ESocketTargets;
  subTarget: ISocketSubTargets[enums.ESocketTargets];
  payload: ISocketPayload[enums.EMessageSubTargets];
}

export interface ISocketUser {
  clients: ISocket[];
  userId: string;
  retry: number;
}

export interface ISocketOutMessage {
  type: enums.ESocketType;
  payload: unknown;
  state?: Partial<IProfileEntity>;
}

export interface ISocketSendMessageBody {
  target: string;
  message: string;
}

export interface IReadMessageBody {
  chatId: string;
  user: string;
}

export interface IGetDetailedBody {
  page: number;
  target: string;
}

export interface IGetMessageBody {
  page: number;
}

export interface IFullChatMessageEntity {
  sender: string;
  receiver: string;
  read: boolean;
  chatId: string;
  message: string;
}
