import { isDefined } from '../../../../tools/validation/index.js';
import type { IGetProfileDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetProfileDto:
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
export default class GetProfileDto implements IGetProfileDto {
  @isDefined
  accessor id: string;

  constructor(id: string) {
    this.id = id;
  }
}
