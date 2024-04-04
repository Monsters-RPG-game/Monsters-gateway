export interface IUserMessageBody {
  messages: number;
  receiver: string;
  sender: string;
}

export interface IDetailedMessageBody {
  sender: string;
  receiver: string;
  read: boolean;
  chatId: string;
  message: string;
}

export interface IUserMessagesEntity {
  type: 'message';
  payload: Record<string, IUserMessageBody>;
}

export interface IDetailedMessagesEntity {
  type: 'message';
  payload: IDetailedMessageBody[];
}
