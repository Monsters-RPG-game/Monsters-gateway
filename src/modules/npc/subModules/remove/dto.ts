import Validation from '../../../../tools/validation.js';
import type { IRemoveCharacterDto } from './types.js';

export default class RemoveCharacterDto implements IRemoveCharacterDto {
  id: string;

  constructor(data: IRemoveCharacterDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
