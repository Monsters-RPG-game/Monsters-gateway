import { isDefined } from '../../../../tools/validation/index.js';
import type { IGetPartyDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetPartyDto:
 *     parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 */
export default class GetPartyDto implements IGetPartyDto {
  @isDefined
  accessor id: string;

  constructor(id: string) {
    this.id = id;
  }
}
