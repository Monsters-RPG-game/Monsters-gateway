import Validation from '../../../../tools/validation.js';
import type { IUseSkillDto } from './types.js';

export default class UseSkillDto implements IUseSkillDto {
  target: string;
  skillId: string;

  constructor(data: IUseSkillDto) {
    this.target = data.target;
    this.skillId = data.skillId;

    this.validate();
  }

  private validate(): void {
    new Validation(this.target, 'target').isDefined();
    new Validation(this.skillId, 'skillId').isDefined();
  }
}
