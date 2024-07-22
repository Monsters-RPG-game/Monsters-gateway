import Validation from '../../../../tools/validation/index.js';
import type { IGetNarratorStoryDto } from './types';

export default class GetNarratorStoryDto implements IGetNarratorStoryDto {
  id: string;
  constructor(data: IGetNarratorStoryDto) {
    this.id = data.id;
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
