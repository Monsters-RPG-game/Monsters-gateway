import Validation from '../../../../tools/validation.js';
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
  id: string;

  constructor(data: IGetPartyDto) {
    this.id = data.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
