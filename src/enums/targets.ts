export enum EUserMainTargets {
  Npc = 'npc',
  Log = 'log',
  User = 'user',
  Chat = 'chat',
  Party = 'party',
  Stats = 'stats',
  Fight = 'fight',
  Profile = 'profile',
  Skills = 'skills',
  NpcStory = 'npcStory',
  NarratorStory = 'narratorStory',
  SingleSkill = 'singleSkill',
  Message = 'message',
  Inventory = 'inventory',
  CharacterState = 'characterState',
  CharacterLocation = 'characterLocation',
}

export enum EUserTargets {
  Register = 'register',
  GetName = 'getName',
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

export enum ESkillsTargets {
  GetSkills = 'getSkills',
  GetDetailedSkills = 'getDetailedSkills',
  AddSkills = 'addSkills',
}
export enum ENpcStoryTargets {
  GetNpcStory = 'getNpcStory',
  GetNpcIntent = 'getNpcIntent',
}
export enum ENarratorStoryTargets {
  GetNarratorStory = 'getNarratorStory',
  GetByStageNarratorStory = 'getByStageNarratorStory',
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
  UseSkill = 'useSkill',
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

export enum EStatsTargets {
  GetStats = 'getStats',
}

export enum ENpcTargets {
  GetNpc = 'getNpc',
  AddNpc = 'addNpc',
  RemoveNpc = 'removeNpc',
  UpdateNpc = 'updateNpc',
}
