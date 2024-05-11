export enum ESocketTargets {
  Movement = 'movement',
  Chat = 'chat',
}

export enum EMovementSubTargets {
  Move = 'move',
  Get = 'get',
}

export enum EMessageSubTargets {
  Send = 'send',
  Get = 'get',
  Read = 'read',
  GetUnread = 'getUnread',
}

export enum ESocketType {
  Error = 'error',
  Message = 'message',
  ChatMessage = 'chatMessage',
  Success = 'success',
}
