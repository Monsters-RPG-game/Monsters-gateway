import Validation from '../../../../tools/validation/index.js';
import type { IAddSkillsDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddSkillsDto:
 *     parameters:
 *       - in: body
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
export default class AddSkillsDto implements IAddSkillsDto {
  owner: string;

  constructor(data: IAddSkillsDto) {
    this.owner = data.owner;

    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined();
  }
}
