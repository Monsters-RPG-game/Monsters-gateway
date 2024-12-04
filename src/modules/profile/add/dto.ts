import Validation from '../../../tools/validation/index.js';
import type { IAddProfileDto } from './types.js';
import type { EUserRace } from '../../../enums/index.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddProfileDto:
 *       type: object
 *       properties:
 *         race:
 *           type: string
 *           enum: ['human', 'elf', 'goblin', 'dwarf', 'orc', 'fairy', 'dragonBorn']
 */
export default class AddProfileDto implements IAddProfileDto {
  location: string;
  race: EUserRace;

  constructor(data: IAddProfileDto, location: string) {
    this.race = data.race;
    this.location = location;

    this.validate();
  }

  private validate(): void {
    new Validation(this.race, 'race').isDefined();
    new Validation(this.location, 'location').isDefined();
  }
}
