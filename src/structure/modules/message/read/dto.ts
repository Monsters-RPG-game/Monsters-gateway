import { isDefined } from '../../../../tools/validation/index.js';
import type { IReadMessageDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IReadMessageDto:
 *       type: object
 *       properties:
 *         chatId:
 *           type: string
 *         receiver:
 *           type: string
 */
export default class ReadMessagesDto implements IReadMessageDto {
  @isDefined
  accessor chatId: string;
  @isDefined
  accessor receiver: string;

  constructor(body: IReadMessageDto) {
    this.chatId = body.chatId;
    this.receiver = body.receiver;
  }
}
