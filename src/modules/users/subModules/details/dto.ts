import { MissingArgError } from '../../../../errors/index.js';
import Validation from '../../../../tools/validation.js';
import type { IUserDetailsDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUserDetailsDto:
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
export default class UserDetailsDto implements IUserDetailsDto {
  name?: string;
  id?: string;

  constructor(data: IUserDetailsDto) {
    this.name = data?.name;
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    if (!this.name && !this.id) throw new MissingArgError('name');

    if (!this.name) {
      new Validation(this.id, 'id').isDefined();
    } else {
      new Validation(this.name, 'name').isDefined();
    }
  }
}
