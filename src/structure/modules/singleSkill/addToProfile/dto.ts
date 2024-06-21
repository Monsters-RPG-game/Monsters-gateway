import Validation from '../../../../tools/validation/index.js';
import type { IAddToProfileDto } from './types';

export default class AddToProfileDto implements IAddToProfileDto {
  profileId: string;
  singleSkillId: string;

  constructor(data: IAddToProfileDto) {
    this.profileId = data.profileId;
    this.singleSkillId = data.singleSkillId;
    this.validate();
  }
  private validate(): void {
    new Validation(this.profileId, 'profileId').isDefined();
    new Validation(this.singleSkillId, 'singleSkillId').isDefined();
  }
}
