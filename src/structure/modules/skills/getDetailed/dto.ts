import Validation from '../../../../tools/validation/index.js';
import type { IGetDetailedSkillsDto } from './types.js';

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
export default class GetDetailedSkillsDto implements IGetDetailedSkillsDto {
  id: string;

  constructor(id: string) {
    this.id = id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
