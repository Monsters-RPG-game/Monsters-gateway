import { ECharacterState } from '../../enums/users.js';
import { UserCannotMove } from '../../errors/index.js';
import Validator from '../../tools/validation/index.js';
import type {
  IGetMessageBody,
  IReadMessageBody,
  ISocket,
  ISocketInMessage,
  ISocketSendMessageBody,
} from './types/index.js';

export default class Validation {
  preValidate(data: ISocketInMessage): void {
    new Validator(data.payload, 'payload').isDefined();
  }

  validateSendMessage(data: ISocketSendMessageBody): void {
    new Validator(data.message, 'message').isDefined().isBetween(200);
    new Validator(data.target, 'target').isDefined().isBetween(24, 24);
  }

  validateGetMessage(data: IGetMessageBody): void {
    new Validator(data.page, 'page').isDefined().isNumber();
  }

  validateReadMessage(data: IReadMessageBody): void {
    new Validator(data.chatId, 'chatId').isDefined().isBetween(24, 24);
  }

  validateCanMove(ws: ISocket): void {
    if (ws.profile?.state === ECharacterState.Fight) throw new UserCannotMove();
  }
}
