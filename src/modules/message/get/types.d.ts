export interface IGetMessagesDto {
  page: number;
  target: string | undefined;
}

export interface IFullMessageEntity {
  sender: string;
  receiver: string;
  read: boolean;
  chatId: string;
  message: string;
}

export interface IPreparedMessagesBody {
  sender: string;
  receiver: string;
  messages: number;
}
