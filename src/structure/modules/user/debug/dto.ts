import Validation from '../../../../tools/validation/index.js';
import type { IDebugGetAllUsersDto } from './types.d.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetAllUsersDto:
 *       parameters:
 *         - in: query
 *           name: page
 *           required: true
 *           schema:
 *             type: number
 */
export default class DebugGetAllUsersDto implements IDebugGetAllUsersDto {
  page: number;

  constructor(page: number) {
    this.page = page;

    this.validate();
  }

  validate(): void {
    new Validation(this.page, 'page').isDefined().isNumber();
  }
}
