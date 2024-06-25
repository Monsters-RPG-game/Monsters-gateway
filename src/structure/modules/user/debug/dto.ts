import { isDefined } from '../../../../tools/validation/index.js';
import type { IDebugGetAllUsersDto } from './types.js';

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
  @isDefined
  accessor page: number;

  constructor(page: number) {
    this.page = page;
  }
}
