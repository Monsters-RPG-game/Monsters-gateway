import { isDefined } from '../../../../tools/validation/index.js';
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
  @isDefined
  accessor page: number;
  @isDefined
  accessor target: string | undefined;

  constructor(page: number, target?: string) {
    this.page = page;
    this.target = target;
  }
}
