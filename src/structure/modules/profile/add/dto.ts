import Validation from '../../../../tools/validation/index.js';
import type { IAddProfileDto } from './types.d.js';
import type { EUserRace } from '../../../../enums/index.js';

export default class AddProfileDto implements IAddProfileDto {
  race: EUserRace;

  constructor(data: IAddProfileDto) {
    this.race = data.race;

    this.validate();
  }

  private validate(): void {
    new Validation(this.race, 'race').isDefined();
  }
}
