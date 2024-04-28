import Validation from '../../../../tools/validation/index.js';
import type { IGetMessagesDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetMessagesDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: number
 */
export default class GetMessagesDto implements IGetMessagesDto {
  page: number;
  target: string | undefined;

  constructor(page: number, target?: string) {
    this.page = page;
    this.target = target;

    this.validate();
  }

  validate(): void {
    new Validation(this.page, 'page').isDefined();
    if (this.target) new Validation(this.target, 'target').isDefined();
  }
}
