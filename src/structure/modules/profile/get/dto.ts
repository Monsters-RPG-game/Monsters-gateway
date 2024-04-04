import Validation from '../../../../tools/validation/index.js';
import type { IGetProfileDto } from './types.d.js';

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
  id: string;

  constructor(id: string) {
    this.id = id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
