import { isDefined } from '../../../../tools/validation/index.js';
import type { IAddExpDto } from './types.js';

export default class AddExpDto implements IAddExpDto {
  @isDefined
  accessor profileId: string;
  @isDefined
  accessor exp: number;

  constructor(data: IAddExpDto) {
    this.profileId = data.profileId;
    this.exp = data.exp;
  }
}
