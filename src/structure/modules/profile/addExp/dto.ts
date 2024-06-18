import Validation from '../../../../tools/validation/index.js';
import type { IAddExpDto } from './types.js';

export default class AddExpDto implements IAddExpDto {
  profileId: string;
  exp: number;

  constructor(data: IAddExpDto) {
    this.profileId = data.profileId;
    this.exp = data.exp;
    this.validate();
  }

  private validate(): void {
    new Validation(this.profileId, 'profileId').isDefined();
    new Validation(this.exp, 'exp').isDefined();
  }
}
