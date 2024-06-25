import { isDefined } from '../../../../tools/validation/index.js';
import type { IChangeCharacterStatusDto } from './types.js';
import type { ECharacterState } from '../../../../enums/index.js';

export default class ChangeCharacterStatusDto implements IChangeCharacterStatusDto {
  @isDefined
  accessor state: ECharacterState;

  constructor(data: IChangeCharacterStatusDto) {
    this.state = data.state;
  }
}
