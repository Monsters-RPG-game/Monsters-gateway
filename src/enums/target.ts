export enum EConnectionMainTargets {
  User = 'user',
  Chat = 'chat',
  Fight = 'fight',
  Profile = 'profile',
  Message = 'message',
}

export enum EUserSubTargets {
  GetName = 'getName',
  DebugGetAll = 'debugGetAll',
}

export enum EProfileSubTargets {
  Get = 'getProfile',
}

export enum EMessagesSubTargets {
  Send = 'send',
  Get = 'get',
  Read = 'read',
  GetUnread = 'getUnread',
}

export enum EChatSubTargets {
  Send = 'sendChatMessage',
  Get = 'getChatMessage',
  Read = 'readChatMessage',
  GetUnread = 'getUnreadChatMessages',
}
