import Validation from '../../../../tools/validation.js';
import type { IGetNarratorStoryDto } from './types.js';

export default class GetNarratorStoryDto implements IGetNarratorStoryDto {
  id: string;
  constructor(data: IGetNarratorStoryDto) {
    this.id = data.id;
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
