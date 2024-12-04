import Validation from '../../../tools/validation/index.js';
import type { IGetNpcStoryDto } from './types';

export default class GetNpcStoryDto implements IGetNpcStoryDto {
  id: string;
  constructor(data: IGetNpcStoryDto) {
    this.id = data.id;
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
