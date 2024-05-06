export enum EMessageTypes {
  Error = 'error',
  Credentials = 'credentials',
  Send = 'send',
  Heartbeat = 'heartbeat',
}

export enum ERabbit {
  RetryLimit = 10,
}

export enum EServices {
  Fights = 'fights',
  Gateway = 'gateway',
  Users = 'users',
  Maps = 'maps',
  Messages = 'messages',
}

export enum EAmqQueues {
  Fights = 'fightsQueue',
  Gateway = 'gatewayQueue',
  Users = 'usersQueue',
  Maps = 'mapsQueue',
  Messages = 'messagesQueue',
}
