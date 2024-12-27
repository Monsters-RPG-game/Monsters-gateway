export enum EUserMainTargets {
  User = 'user',
  Chat = 'chat',
  Fight = 'fight',
  Profile = 'profile',
  Message = 'message',
}

export enum EUserTargets {
  GetName = 'getName',
  DebugGetAll = 'debugGetAll',
}

export enum EProfileTargets {
  Get = 'getProfile',
}

export enum EMessagesTargets {
  Send = 'send',
  Get = 'get',
  Read = 'read',
  GetUnread = 'getUnread',
}

export enum EChatTargets {
  Send = 'sendChatMessage',
  Get = 'getChatMessage',
  Read = 'readChatMessage',
  GetUnread = 'getUnreadChatMessages',
}
