export enum EControllers {
  Fights = 'fights',
  Users = 'users',
  Story = 'story',
  Stats = 'stats',
  Skills = 'skills',
  SingleSkill = 'singleSkill',
  Profile = 'profile',
  Party = 'party',
  Npc = 'npc',
  Inventory = 'inventory',
  Health = 'health',
  Messages = 'messages',
}

export enum EFightActions {
  Attack = 'attack',
  Debug = 'debugFight',
  GetFights = 'getFights',
  GetLogs = 'getLogsFight',
  Leave = 'leaveFight',
  UseSkill = 'useSkill',
}

export enum EUserActions {
  Debug = 'debugUser',
  Details = 'detailsUsers',
  FinishLogout = 'finishLogout',
  FinishRegister = 'finishRegister',
  Login = 'login',
  RefreshToken = 'refreshToken',
  RemoveAccount = 'removeAccount',
  StartLogout = 'startLogout',
  StartRegister = 'startRegister',
  ValidateToken = 'validateToken',
}

export enum EStoryActions {
  GetByIntent = 'getByIntentStory',
  GetByStage = 'getByStageStory',
  GetNarratorStory = 'getNarratorStory',
  GetNpcStory = 'getNpcStory',
}

export enum EStatsActions {
  Get = 'getStats',
}

export enum ESkillsActions {
  Get = 'getSkill',
  Add = 'addSkill',
  GetDetailed = 'getDetailedSkill',
}

export enum ESingleSkillActions {
  Get = 'getSingleSkill',
  Add = 'addSingleSkill',
}

export enum EProfileActions {
  Get = 'getProfile',
  Add = 'addProfile',
  AddExp = 'addExpProfile',
}

export enum EPartyActions {
  Get = 'getParty',
}

export enum ENpcActions {
  Get = 'getNpc',
  Add = 'addNpc',
  Remove = 'removeNpc',
  Update = 'updateNpc',
}

export enum EMessageActions {
  Get = 'getMessage',
  GetUnread = 'getUnreadMessage',
  Read = 'readMessage',
  Send = 'sendMessage',
}

export enum EItemActions {
  Get = 'getItem',
  Drop = 'dropItem',
  Use = 'useItem',
}

export enum EHealthActions {
  Get = 'getHealth',
}
