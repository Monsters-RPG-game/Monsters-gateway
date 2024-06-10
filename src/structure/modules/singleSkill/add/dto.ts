import type { ESkillsType } from 'enums/skills.js';
import Validation from '../../../../tools/validation/index.js';
import type { IAddSingleSkillDto } from './types';

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
export default class AddSingleSkillDto implements IAddSingleSkillDto {
  name: string;
  power: number;
  type: ESkillsType;
  constructor(data: IAddSingleSkillDto) {
    this.name = data.name;
    this.power = data.power;
    this.type = data.type;
    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined();
    new Validation(this.power, 'power').isDefined();
    new Validation(this.type, 'type').isDefined();
  }
}
