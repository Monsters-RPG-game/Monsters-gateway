import type * as enums from '../enums/index.js';
import type FightController from '../modules/fights/controller.js';
import type AttackSubController from '../modules/fights/subModules/attack/index.js';
import type DebugFightSubController from '../modules/fights/subModules/debug/index.js';
import type GetFightsSubController from '../modules/fights/subModules/getFight/index.js';
import type GetFightLogsSubController from '../modules/fights/subModules/getLogs/index.js';
import type LeaveFightSubController from '../modules/fights/subModules/leave/index.js';
import type UseSkillSubController from '../modules/fights/subModules/useSkill/index.js';
import type HealthController from '../modules/health/controller.js';
import type GetHealthSubController from '../modules/health/subModules/get/index.js';
import type InventoryController from '../modules/inventory/controller.js';
import type DropItemSubController from '../modules/inventory/subModules/drop/index.js';
import type GetItemSubController from '../modules/inventory/subModules/get/index.js';
import type UseItemSubController from '../modules/inventory/subModules/use/index.js';
import type MessagesController from '../modules/messages/controller.js';
import type GetMessageSubController from '../modules/messages/subModules/get/index.js';
import type GetUnreadMessageSubController from '../modules/messages/subModules/getUnread/index.js';
import type ReadMessageSubController from '../modules/messages/subModules/read/index.js';
import type SendMessageSubController from '../modules/messages/subModules/send/index.js';
import type NpcController from '../modules/npc/controller.js';
import type AddNpcSubController from '../modules/npc/subModules/add/index.js';
import type GetNpcSubController from '../modules/npc/subModules/get/index.js';
import type RemoveNpcSubController from '../modules/npc/subModules/remove/index.js';
import type UpdateNpcSubController from '../modules/npc/subModules/update/index.js';
import type PartyController from '../modules/party/controller.js';
import type GetPartySubController from '../modules/party/subModules/get/index.js';
import type ProfileController from '../modules/profile/controller.js';
import type AddProfileSubController from '../modules/profile/subModules/add/index.js';
import type AddExpSubController from '../modules/profile/subModules/addExp/index.js';
import type GetProfileSubController from '../modules/profile/subModules/get/index.js';
import type SingleSkillController from '../modules/singleSkill/controller.js';
import type AddSingleSkillSubController from '../modules/singleSkill/subModules/add/index.js';
import type GetSingleSkillSubController from '../modules/singleSkill/subModules/get/index.js';
import type SkillsController from '../modules/skills/controller.js';
import type AddSkillsSubController from '../modules/skills/subModules/add/index.js';
import type GetSkillsSubController from '../modules/skills/subModules/get/index.js';
import type GetDetailedSkillsSubController from '../modules/skills/subModules/getDetailed/index.js';
import type StatsController from '../modules/stats/controller.js';
import type GetStatsSubController from '../modules/stats/subModules/get/index.js';
import type StoryController from '../modules/story/controller.ts';
import type GetByIntentSubController from '../modules/story/subModules/getByIntent/index.js';
import type GetByStageSubController from '../modules/story/subModules/getByStage/index.js';
import type GetNarratorStorySubController from '../modules/story/subModules/getNarratorStory/index.js';
import type GetNpcStorySubController from '../modules/story/subModules/getNpcStory/index.js';
import type UsersController from '../modules/users/controller.js';
import type DebugUserSubController from '../modules/users/subModules/debug/index.js';
import type express from 'express';

export type IControllerActions =
  | enums.EFightActions
  | enums.EUserActions
  | enums.EStoryActions
  | enums.EStatsActions
  | enums.ESingleSkillActions
  | enums.EPartyActions
  | enums.EProfileActions
  | enums.ENpcActions
  | enums.EMessageActions
  | enums.EItemActions
  | enums.EHealthActions
  | enums.ESkillsActions;

export type IKeyofController =
  | keyof typeof enums.EFightActions
  | keyof typeof enums.EUserActions
  | keyof typeof enums.EStoryActions
  | keyof typeof enums.EStatsActions
  | keyof typeof enums.EProfileActions
  | keyof typeof enums.ENpcActions
  | keyof typeof enums.EMessageActions
  | keyof typeof enums.EItemActions
  | keyof typeof enums.ESingleSkillActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IFightControllers extends IControllerActionsMap {
  [enums.EFightActions.Debug]: DebugFightSubController;
  [enums.EFightActions.Attack]: AttackSubController;
  [enums.EFightActions.GetFights]: GetFightsSubController;
  [enums.EFightActions.GetLogs]: GetFightLogsSubController;
  [enums.EFightActions.Leave]: LeaveFightSubController;
  [enums.EFightActions.UseSkill]: UseSkillSubController;
}

export interface INpcControllers extends IControllerActionsMap {
  [enums.ENpcActions.Get]: GetNpcSubController;
  [enums.ENpcActions.Add]: AddNpcSubController;
  [enums.ENpcActions.Update]: UpdateNpcSubController;
  [enums.ENpcActions.Remove]: RemoveNpcSubController;
}

export interface IMessageControllers extends IControllerActionsMap {
  [enums.EMessageActions.Get]: GetMessageSubController;
  [enums.EMessageActions.GetUnread]: GetUnreadMessageSubController;
  [enums.EMessageActions.Send]: SendMessageSubController;
  [enums.EMessageActions.Read]: ReadMessageSubController;
}

export interface IPartyControllers extends IControllerActionsMap {
  [enums.EPartyActions.Get]: GetPartySubController;
}

export interface IProfileControllers extends IControllerActionsMap {
  [enums.EProfileActions.Add]: AddProfileSubController;
  [enums.EProfileActions.Get]: GetProfileSubController;
  [enums.EProfileActions.AddExp]: AddExpSubController;
}

export interface ISingleSkillControllers extends IControllerActionsMap {
  [enums.ESingleSkillActions.Get]: GetSingleSkillSubController;
  [enums.ESingleSkillActions.Add]: AddSingleSkillSubController;
}

export interface IItemControllers extends IControllerActionsMap {
  [enums.EItemActions.Drop]: DropItemSubController;
  [enums.EItemActions.Get]: GetItemSubController;
  [enums.EItemActions.Use]: UseItemSubController;
}

export interface ISkillsControllers extends IControllerActionsMap {
  [enums.ESkillsActions.Get]: GetSkillsSubController;
  [enums.ESkillsActions.Add]: AddSkillsSubController;
  [enums.ESkillsActions.GetDetailed]: GetDetailedSkillsSubController;
}

export interface IStatsControllers extends IControllerActionsMap {
  [enums.EStatsActions.Get]: GetStatsSubController;
}

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.Debug]: DebugUserSubController;
}

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthSubController;
}

export interface IStoryControllers extends IControllerActionsMap {
  [enums.EStoryActions.GetByIntent]: GetByIntentSubController;
  [enums.EStoryActions.GetByStage]: GetByStageSubController;
  [enums.EStoryActions.GetNpcStory]: GetNpcStorySubController;
  [enums.EStoryActions.GetNarratorStory]: GetNarratorStorySubController;
}

export interface IController {
  [enums.EControllers.Story]: StoryController;
  [enums.EControllers.Fights]: FightController;
  [enums.EControllers.Health]: HealthController;
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Stats]: StatsController;
  [enums.EControllers.SingleSkill]: SingleSkillController;
  [enums.EControllers.Skills]: SkillsController;
  [enums.EControllers.Profile]: ProfileController;
  [enums.EControllers.Party]: PartyController;
  [enums.EControllers.Npc]: NpcController;
  [enums.EControllers.Inventory]: InventoryController;
  [enums.EControllers.Messages]: MessagesController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Fights]: IFightControllers;
  [enums.EControllers.Story]: IStoryControllers;
  [enums.EControllers.Skills]: ISkillsControllers;
  [enums.EControllers.SingleSkill]: ISingleSkillControllers;
  [enums.EControllers.Profile]: IProfileControllers;
  [enums.EControllers.Party]: IPartyControllers;
  [enums.EControllers.Npc]: INpcControllers;
  [enums.EControllers.Inventory]: IItemControllers;
  [enums.EControllers.Messages]: IMessageControllers;
  [enums.EControllers.Health]: IHealthControllers;
  [enums.EControllers.Stats]: IStatsControllers;
}

export interface IBaseInnerController<U, P = [express.Request, express.Response]> {
  handle(req: express.Request, res: express.Response): Promise<U>;
  handle(params: P): Promise<U>;
}
