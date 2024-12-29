import type { IUserBrokerInfo } from './user.js';
import type * as types from '../connections/websocket/types/index.js';
import type * as enums from '../enums/index.js';
import type GetMessagesDto from '../modules/messages/subModules/get/dto.js';
import type GetUnreadMessagesDto from '../modules/messages/subModules/getUnread/dto.js';
import type { IGetUnreadMessagesDto } from '../modules/messages/subModules/getUnread/types.js';
import type ReadMessagesDto from '../modules/messages/subModules/read/dto.js';
import type SendMessagesDto from '../modules/messages/subModules/send/dto.js';
import type GetProfileDto from '../modules/profile/subModules/get/dto.js';
import type DebugGetAllUsersDto from '../modules/users/subModules/debug/dto.js';
import type UserDetailsDto from '../modules/users/subModules/details/dto';

export type IRabbitSubTargets =
  | enums.EProfileTargets
  | enums.EUserTargets
  | enums.EMessagesTargets
  | enums.EChatTargets;

export interface IProfileConnectionData {
  [enums.EProfileTargets.Get]: GetProfileDto;
}

export interface IUserConnectionData {
  [enums.EUserTargets.GetName]: UserDetailsDto[];
  [enums.EUserTargets.DebugGetAll]: DebugGetAllUsersDto;
}

export interface IMessageConnectionData {
  [enums.EMessagesTargets.Get]: GetMessagesDto;
  [enums.EMessagesTargets.GetUnread]: GetUnreadMessagesDto;
  [enums.EMessagesTargets.Read]: ReadMessagesDto;
  [enums.EMessagesTargets.Send]: SendMessagesDto;
}

export interface IChatConnectionData {
  [enums.EChatTargets.Get]: types.IGetMessageBody;
  [enums.EChatTargets.GetUnread]: IGetUnreadMessagesDto;
  [enums.EChatTargets.Read]: types.IReadMessageBody;
  [enums.EChatTargets.Send]: types.ISendMessageDto;
}

export interface IRabbitConnectionData
  extends IUserConnectionData,
    IProfileConnectionData,
    IMessageConnectionData,
    IChatConnectionData {}

export type IRabbitTargets = enums.EMessageTypes | enums.EUserMainTargets;

export interface IRabbitMessage {
  user: IUserBrokerInfo | undefined;
  target: IRabbitTargets;
  subTarget: IRabbitSubTargets;
  payload: unknown;
}

export type IAvailableServices = Exclude<enums.EServices, enums.EServices.Gateway>;

export type ICommunicationQueue = Record<
  string,
  {
    resolve: (
      value:
        | { type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send; payload: unknown }
        | PromiseLike<{
            type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
            payload: unknown;
          }>,
    ) => void;
    reject: (reason?: unknown) => void;
    target: enums.EServices;
  }
>;
