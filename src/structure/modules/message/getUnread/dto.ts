import Validation from '../../../../tools/validation/index.js';
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
  page: number;

  constructor(page: number) {
    this.page = page;

    this.validate();
  }

  validate(): void {
    new Validation(this.page, 'page').isDefined();
  }
}
