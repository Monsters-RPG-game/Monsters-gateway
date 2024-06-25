import { isDefined } from '../../../../tools/validation/index.js';
import type { IRemoveCharacterDto } from './types.js';

export default class RemoveCharacterDto implements IRemoveCharacterDto {
  @isDefined
  accessor id: string;

  constructor(data: IRemoveCharacterDto) {
    this.id = data.id;
  }
}
