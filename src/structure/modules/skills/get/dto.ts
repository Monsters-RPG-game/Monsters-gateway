import Validation from '../../../../tools/validation/index.js';
import type { IGetSkillsDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetSkillsDto:
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
export default class GetSkillsDto implements IGetSkillsDto {
  id: string;

  constructor(id: string) {
    this.id = id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
