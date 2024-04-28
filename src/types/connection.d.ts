import type { IUserBrokerInfo } from './user.js';
import type * as types from '../connections/websocket/types/index.js';
import type * as enums from '../enums/index.js';
import type { IAddBugReportDto } from '../structure/modules/bugReport/add/types.js';
import type ChangeCharacterStatusDto from '../structure/modules/character/changeState/dto.js';
import type AttackDto from '../structure/modules/fights/attack/dto.js';
import type CreateFightDto from '../structure/modules/fights/debug/dto.js';
import type { IGetFightDto } from '../structure/modules/fights/getFights/types.js';
import type { IGetFightLogsDto } from '../structure/modules/fights/getLogs/types.js';
import type InventoryDropDto from '../structure/modules/inventory/drop/dto.js';
import type InventoryAddDto from '../structure/modules/inventory/use/dto.js';
import type AddLogDto from '../structure/modules/logs/add/dto.js';
import type GetLogDto from '../structure/modules/logs/get/dto.js';
import type GetMessagesDto from '../structure/modules/message/get/dto.js';
import type GetUnreadMessagesDto from '../structure/modules/message/getUnread/dto.js';
import type { IGetUnreadMessagesDto } from '../structure/modules/message/getUnread/types.js';
import type ReadMessagesDto from '../structure/modules/message/read/dto.js';
import type SendMessagesDto from '../structure/modules/message/send/dto.js';
import type { IAddCharacterDto } from '../structure/modules/npc/add/types.js';
import type { IGetCharacterDto } from '../structure/modules/npc/get/types.js';
import type { IRemoveCharacterDto } from '../structure/modules/npc/remove/types.js';
import type { IUpdateCharacterDto } from '../structure/modules/npc/update/types.js';
import type LoginDto from '../structure/modules/oidc/interaction/dto.js';
import type GetPartyDto from '../structure/modules/party/get/dto.js';
import type AddProfileDto from '../structure/modules/profile/add/dto.js';
import type GetProfileDto from '../structure/modules/profile/get/dto.js';
import type GetStatsDto from '../structure/modules/stats/get/dto.js';
import type DebugGetAllUsersDto from '../structure/modules/user/debug/dto.js';
import type UserDetailsDto from '../structure/modules/user/details/dto';
import type RegisterDto from '../structure/modules/user/register/dto.js';
import type RemoveUserDto from '../structure/modules/user/remove/dto.js';

export type IRabbitSubTargets =
  | enums.EProfileTargets
  | enums.EUserTargets
  | enums.EItemsTargets
  | enums.EPartyTargets
  | enums.EMessagesTargets
  | enums.EChatTargets
  | enums.EFightsTargets
  | enums.ECharacterStateTargets
  | enums.EBugReportTargets
  | enums.EStatsTargets
  | enums.ENpcTargets
  | enums.ELogTargets;

export interface IProfileConnectionData {
  [enums.EProfileTargets.Get]: GetProfileDto;
  [enums.EProfileTargets.Create]: AddProfileDto;
}

export interface IStatsConnectionData {
  [enums.EStatsTargets.GetStats]: GetStatsDto;
}

export interface IUserConnectionData {
  [enums.EUserTargets.Login]: LoginDto;
  [enums.EUserTargets.GetName]: UserDetailsDto[];
  [enums.EUserTargets.Register]: RegisterDto;
  [enums.EUserTargets.Remove]: RemoveUserDto;
  [enums.EUserTargets.DebugGetAll]: DebugGetAllUsersDto;
}

export interface ILogConnectionData {
  [enums.ELogTargets.GetLog]: GetLogDto;
  [enums.ELogTargets.AddLog]: AddLogDto;
}

export interface IFightConnectionData {
  [enums.EFightsTargets.Leave]: null;
  [enums.EFightsTargets.CreateFight]: CreateFightDto;
  [enums.EFightsTargets.Attack]: AttackDto;
  [enums.EFightsTargets.GetLogs]: IGetFightLogsDto;
  [enums.EFightsTargets.GetFights]: IGetFightDto;
}

export interface IInventoryConnectionData {
  [enums.EItemsTargets.Drop]: InventoryDropDto;
  [enums.EItemsTargets.Get]: null;
  [enums.EItemsTargets.Use]: InventoryAddDto;
}

export interface IBugReportConnectionData {
  [enums.EBugReportTargets.AddBugReport]: IAddBugReportDto;
  [enums.EBugReportTargets.GetBugReport]: null;
}

export interface INpcConnectionData {
  [enums.ENpcTargets.GetNpc]: IGetCharacterDto;
  [enums.ENpcTargets.AddNpc]: IAddCharacterDto;
  [enums.ENpcTargets.RemoveNpc]: IRemoveCharacterDto;
  [enums.ENpcTargets.UpdateNpc]: IUpdateCharacterDto;
}

export interface IPartyConnectionData {
  [enums.EPartyTargets.Get]: GetPartyDto;
}

export interface ICharacterStateConnectionData {
  [enums.ECharacterStateTargets.ChangeState]: ChangeCharacterStatusDto;
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
    IPartyConnectionData,
    ICharacterStateConnectionData,
    IMessageConnectionData,
    IChatConnectionData,
    ILogConnectionData,
    IFightConnectionData,
    IStatsConnectionData,
    INpcConnectionData,
    IBugReportConnectionData,
    IInventoryConnectionData {}

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
