export enum EUserMainTargets {
  Map = 'map',
  Npc = 'npc',
  Log = 'log',
  User = 'user',
  Chat = 'chat',
  Party = 'party',
  Stats = 'stats',
  Fight = 'fight',
  Profile = 'profile',
  Skills = 'skills',
  SingleSkill = 'singleSkill',
  Message = 'message',
  BugReport = 'bugReport',
  Inventory = 'inventory',
  CharacterState = 'characterState',
  CharacterLocation = 'characterLocation',
}

export enum EUserTargets {
  Register = 'register',
  Login = 'login',
  GetName = 'getName',
  Remove = 'removeUser',
  DebugGetAll = 'debugGetAll',
}

export enum EProfileTargets {
  Create = 'createProfile',
  Get = 'getProfile',
  AddExp = 'addExp',
}

export enum EItemsTargets {
  Get = 'getItem',
  Use = 'useItem',
  Drop = 'dropItem',
}

export enum EMessagesTargets {
  Send = 'send',
  Get = 'get',
  Read = 'read',
  GetUnread = 'getUnread',
}

export enum EMapTargets {
  Create = 'createMap',
  Get = 'getMap',
  Update = 'updateMap',
}

export enum ESkillsTargets {
  GetSkills = 'getSkills',
  AddSkills = 'addSkills',
}

export enum ESingleSkillTargets {
  GetSingleSkill = 'getSkill',
  AddSingleSkill = 'addSingleSkill',
}

export enum EChatTargets {
  Send = 'sendChatMessage',
  Get = 'getChatMessage',
  Read = 'readChatMessage',
  GetUnread = 'getUnreadChatMessages',
}

export enum EFightsTargets {
  Attack = 'attack',
  CreateFight = 'createFight',
  Leave = 'leave',
  GetLogs = 'getLogs',
  GetFights = 'getFights',
}

export enum ECharacterLocationTargets {
  Create = 'createCharacterLocation',
  Get = 'getCharacterLocation',
  Change = 'changeCharacterLocation',
}

export enum EPartyTargets {
  Get = 'getParty',
}

export enum ECharacterStateTargets {
  ChangeState = 'changeState',
}

export enum EBugReportTargets {
  AddBugReport = 'addBugReport',
  GetBugReport = 'getBugReport',
}

export enum EStatsTargets {
  GetStats = 'getStats',
}

export enum ENpcTargets {
  GetNpc = 'getNpc',
  AddNpc = 'addNpc',
  RemoveNpc = 'removeNpc',
  UpdateNpc = 'updateNpc',
}
