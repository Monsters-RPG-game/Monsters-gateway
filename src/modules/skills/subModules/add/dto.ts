import Validation from '../../../../tools/validation.js';
import type { IAddSkillsDto } from './types.js';

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
export default class AddSkillsDto implements IAddSkillsDto {
  owner: string;
  singleSkillId: string;

  constructor(data: IAddSkillsDto) {
    this.singleSkillId = data.singleSkillId;
    this.owner = data.owner;

    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined();
    new Validation(this.singleSkillId, 'singleSkillId').isDefined();
  }
}
