import Validation from '../../../../tools/validation.js';
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

  constructor(data: IGetSkillsDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
