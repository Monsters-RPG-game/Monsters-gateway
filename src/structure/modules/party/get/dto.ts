import Validation from '../../../../tools/validation/index.js';
import type { IGetPartyDto } from './types.d.js';

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
  id: string;

  constructor(id: string) {
    this.id = id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
