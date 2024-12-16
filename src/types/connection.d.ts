import type { IUserBrokerInfo } from './user.js';
import type * as types from '../connections/websocket/types/index.js';
import type * as enums from '../enums/index.js';
import type ChangeCharacterStatusDto from '../modules/character/changeState/dto.js';
import type { IChangeCharacterLocationDto } from '../modules/characterLocation/change/types';
import type { ICreateCharacterLocationDto } from '../modules/characterLocation/create/types';
import type { IGetCharacterLocationDto } from '../modules/characterLocation/get/types';
import type AttackDto from '../modules/fights/attack/dto.js';
import type CreateFightDto from '../modules/fights/debug/dto.js';
import type { IGetFightDto } from '../modules/fights/getFights/types.js';
import type { IGetFightLogsDto } from '../modules/fights/getLogs/types.js';
import type UseSkillDto from '../modules/fights/useSkill/dto.js';
import type InventoryDropDto from '../modules/inventory/drop/dto.js';
import type InventoryAddDto from '../modules/inventory/use/dto.js';
import type GetMessagesDto from '../modules/message/get/dto.js';
import type GetUnreadMessagesDto from '../modules/message/getUnread/dto.js';
import type { IGetUnreadMessagesDto } from '../modules/message/getUnread/types.js';
import type ReadMessagesDto from '../modules/message/read/dto.js';
import type SendMessagesDto from '../modules/message/send/dto.js';
import type { IAddCharacterDto } from '../modules/npc/add/types.js';
import type { IGetCharacterDto } from '../modules/npc/get/types.js';
import type { IRemoveCharacterDto } from '../modules/npc/remove/types.js';
import type { IUpdateCharacterDto } from '../modules/npc/update/types.js';
import type GetPartyDto from '../modules/party/get/dto.js';
import type AddProfileDto from '../modules/profile/add/dto.js';
import type AddExpDto from '../modules/profile/addExp/dto.js';
import type GetProfileDto from '../modules/profile/get/dto.js';
import type AddSingleSkillDto from '../modules/singleSkill/add/dto.js';
import type GetSingleSkillDto from '../modules/singleSkill/get/dto.js';
import type AddSkillsDto from '../modules/skills/add/dto.js';
import type GetSkillsDto from '../modules/skills/get/dto.js';
import type GetDetailedSkillsDto from '../modules/skills/getDetailed/dto.js';
import type GetStatsDto from '../modules/stats/get/dto.js';
import type GetByStageNarratorStoryDto from '../modules/story/getByStage/dto.js';
import type GetNpcIntentDto from '../modules/story/getIntent/dto.js';
import type GetNarratorStoryDto from '../modules/story/getNarratoryStory/dto.js';
import type GetNpcStoryDto from '../modules/story/getNpcStory/dto.js';
import type DebugGetAllUsersDto from '../modules/user/debug/dto.js';
import type UserDetailsDto from '../modules/user/details/dto';
import type RegisterDto from '../modules/user/register/dto.js';

export type IRabbitSubTargets =
  | enums.EProfileTargets
  | enums.EUserTargets
  | enums.EItemsTargets
  | enums.EPartyTargets
  | enums.EMessagesTargets
  | enums.EChatTargets
  | enums.EFightsTargets
  | enums.ECharacterStateTargets
  | enums.EStatsTargets
  | enums.ESkillsTargets
  | enums.ENpcStoryTargets
  | enums.ENarratorStoryTargets
  | enums.ESingleSkillTargets
  | enums.ECharacterLocationTargets
  | enums.ENpcTargets;

export interface IProfileConnectionData {
  [enums.EProfileTargets.Get]: GetProfileDto;
  [enums.EProfileTargets.Create]: AddProfileDto;
  [enums.EProfileTargets.AddExp]: AddExpDto;
}

export interface IStatsConnectionData {
  [enums.EStatsTargets.GetStats]: GetStatsDto;
}

export interface IUserConnectionData {
  [enums.EUserTargets.GetName]: UserDetailsDto[];
  [enums.EUserTargets.Register]: RegisterDto;
  [enums.EUserTargets.DebugGetAll]: DebugGetAllUsersDto;
}

export interface IFightConnectionData {
  [enums.EFightsTargets.Leave]: null;
  [enums.EFightsTargets.CreateFight]: CreateFightDto;
  [enums.EFightsTargets.Attack]: AttackDto;
  [enums.EFightsTargets.GetLogs]: IGetFightLogsDto;
  [enums.EFightsTargets.GetFights]: IGetFightDto;
  [enums.EFightsTargets.UseSkill]: UseSkillDto;
}

export interface IInventoryConnectionData {
  [enums.EItemsTargets.Drop]: InventoryDropDto;
  [enums.EItemsTargets.Get]: null;
  [enums.EItemsTargets.Use]: InventoryAddDto;
}

export interface ICharacterLocationConnectionData {
  [enums.ECharacterLocationTargets.Create]: ICreateCharacterLocationDto;
  [enums.ECharacterLocationTargets.Get]: IGetCharacterLocationDto;
  [enums.ECharacterLocationTargets.Change]: IChangeCharacterLocationDto;
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

export interface ISkillsConnectionData {
  [enums.ESkillsTargets.GetSkills]: GetSkillsDto;
  [enums.ESkillsTargets.AddSkills]: AddSkillsDto;
  [enums.ESkillsTargets.GetDetailedSkills]: GetDetailedSkillsDto;
}

export interface ISingleSkillConnectionData {
  [enums.ESingleSkillTargets.GetSingleSkill]: GetSingleSkillDto;
  [enums.ESingleSkillTargets.AddSingleSkill]: AddSingleSkillDto;
}

export interface ICharacterStateConnectionData {
  [enums.ECharacterStateTargets.ChangeState]: ChangeCharacterStatusDto;
}

export interface INpcStoryConnectionData {
  [enums.ENpcStoryTargets.GetNpcStory]: GetNpcStoryDto;
  [enums.ENpcStoryTargets.GetNpcIntent]: GetNpcIntentDto;
}

export interface INarratorStoryConnectionData {
  [enums.ENarratorStoryTargets.GetNarratorStory]: GetNarratorStoryDto;
  [enums.ENarratorStoryTargets.GetByStageNarratorStory]: GetByStageNarratorStoryDto;
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
    IFightConnectionData,
    IStatsConnectionData,
    INpcConnectionData,
    INarratorStoryConnectionData,
    ISkillsConnectionData,
    ISingleSkillConnectionData,
    INpcStoryConnectionData,
    ICharacterLocationConnectionData,
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
