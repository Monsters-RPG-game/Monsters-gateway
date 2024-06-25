import { isDefined } from '../../../../tools/validation/index.js';
import type { IGetUnreadMessagesDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetUnreadMessagesDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: number
 */
export default class GetUnreadMessagesDto implements IGetUnreadMessagesDto {
  @isDefined
  accessor page: number;

  constructor(page: number) {
    this.page = page;
  }
}
