import Validation from '../../../../tools/validation/index.js';
import type { IChangeCharacterStatusDto } from './types.js';
import type { ECharacterState } from '../../../../enums/index.js';

export default class ChangeCharacterStatusDto implements IChangeCharacterStatusDto {
  state: ECharacterState;

  constructor(data: IChangeCharacterStatusDto) {
    this.state = data.state;

    this.validate();
  }

  private validate(): void {
    new Validation(this.state, 'state').isDefined();
  }
}
