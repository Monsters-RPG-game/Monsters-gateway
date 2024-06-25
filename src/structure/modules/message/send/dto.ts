import { isDefined } from '../../../../tools/validation/index.js';
import type { ISendMessageDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ISendMessageDto:
 *       type: object
 *       properties:
 *         body:
 *           type: string
 *         receiver:
 *           type: string
 */
export default class SendMessagesDto implements ISendMessageDto {
  @isDefined
  accessor body: string;
  @isDefined
  accessor receiver: string;
  @isDefined
  accessor sender: string;

  constructor(body: ISendMessageDto, sender: string) {
    this.body = body.body;
    this.receiver = body.receiver;
    this.sender = sender;
  }
}
