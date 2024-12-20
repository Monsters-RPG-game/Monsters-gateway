import type { IUserBrokerInfo } from './user.js';
import type * as types from '../connections/websocket/types/index.js';
import type * as enums from '../enums/index.js';
import type ChangeCharacterStatusDto from '../modules/character/subModules/changeState/dto.js';
import type { IChangeCharacterLocationDto } from '../modules/characterLocation/subModules/change/types';
import type { ICreateCharacterLocationDto } from '../modules/characterLocation/subModules/create/types';
import type { IGetCharacterLocationDto } from '../modules/characterLocation/subModules/get/types';
import type AttackDto from '../modules/fights/subModules/attack/dto.js';
import type CreateFightDto from '../modules/fights/subModules/debug/dto.js';
import type { IGetFightDto } from '../modules/fights/subModules/getFight/types.js';
import type { IGetFightLogsDto } from '../modules/fights/subModules/getLogs/types.js';
import type UseSkillDto from '../modules/fights/subModules/useSkill/dto.js';
import type InventoryDropDto from '../modules/inventory/subModules/drop/dto.js';
import type InventoryAddDto from '../modules/inventory/subModules/use/dto.js';
import type GetMessagesDto from '../modules/messages/subModules/get/dto.js';
import type GetUnreadMessagesDto from '../modules/messages/subModules/getUnread/dto.js';
import type { IGetUnreadMessagesDto } from '../modules/messages/subModules/getUnread/types.js';
import type ReadMessagesDto from '../modules/messages/subModules/read/dto.js';
import type SendMessagesDto from '../modules/messages/subModules/send/dto.js';
import type { IAddCharacterDto } from '../modules/npc/subModules/add/types.js';
import type { IGetCharacterDto } from '../modules/npc/subModules/get/types.js';
import type { IRemoveCharacterDto } from '../modules/npc/subModules/remove/types.js';
import type { IUpdateCharacterDto } from '../modules/npc/subModules/update/types.js';
import type GetPartyDto from '../modules/party/subModules/get/dto.js';
import type AddProfileDto from '../modules/profile/subModules/add/dto.js';
import type AddExpDto from '../modules/profile/subModules/addExp/dto.js';
import type GetProfileDto from '../modules/profile/subModules/get/dto.js';
import type AddSingleSkillDto from '../modules/singleSkill/subModules/add/dto.js';
import type GetSingleSkillDto from '../modules/singleSkill/subModules/get/dto.js';
import type AddSkillsDto from '../modules/skills/subModules/add/dto.js';
import type GetSkillsDto from '../modules/skills/subModules/get/dto.js';
import type GetDetailedSkillsDto from '../modules/skills/subModules/getDetailed/dto.js';
import type GetStatsDto from '../modules/stats/subModules/get/dto.js';
import type GetNpcIntentDto from '../modules/story/subModules/getByIntent/dto.js';
import type GetByStageNarratorStoryDto from '../modules/story/subModules/getByStage/dto.js';
import type GetNarratorStoryDto from '../modules/story/subModules/getNarratorStory/dto.js';
import type GetNpcStoryDto from '../modules/story/subModules/getNpcStory/dto.js';
import type DebugGetAllUsersDto from '../modules/users/subModules/debug/dto.js';
import type UserDetailsDto from '../modules/users/subModules/details/dto';

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
