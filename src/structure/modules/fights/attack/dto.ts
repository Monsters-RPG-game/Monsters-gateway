import Validation from '../../../../tools/validation/index.js';
import type { IAttackDto } from './types.d.js';

export default class AttackDto implements IAttackDto {
  target: string;

  constructor(body: IAttackDto) {
    this.target = body.target;

    this.validate();
  }

  validate(): void {
    new Validation(this.target, 'target').isDefined();
  }
}
