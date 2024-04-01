import Validation from '../../../../tools/validation/index.js';
import type { IGetFightLogsDto } from './types.d.js';

export default class GetFightLogsDto implements IGetFightLogsDto {
  id: string;

  constructor(body: IGetFightLogsDto) {
    this.id = body.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
