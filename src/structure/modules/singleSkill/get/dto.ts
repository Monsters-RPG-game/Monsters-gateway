import Validation from '../../../../tools/validation/index.js';
import type { IGetSingleSkillDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetSingleSkillDto:
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
export default class GetSingleSkillDto implements IGetSingleSkillDto {
  id: string;
  constructor(id: string) {
    this.id = id;
    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
