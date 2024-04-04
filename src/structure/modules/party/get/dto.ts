import Validation from '../../../../tools/validation/index.js';
import type { IGetPartyDto } from './types.d.js';

export default class GetPartyDto implements IGetPartyDto {
  id: string;

  constructor(id: string) {
    this.id = id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
