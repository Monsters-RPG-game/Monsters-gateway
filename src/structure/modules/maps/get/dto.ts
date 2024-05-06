import Validation from '../../../../tools/validation/index.js';
import type { IGetMapDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetMapDto:
 *     parameters:
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 */
export default class GetMapDto implements IGetMapDto {
  name?: string;
  id?: string;

  constructor(data: IGetMapDto) {
    this.name = data.name;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (!this.id) new Validation(this.id, 'id').isDefined();
    if (!this.name) new Validation(this.name, 'name').isDefined();
  }
}
