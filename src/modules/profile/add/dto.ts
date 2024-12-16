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
  race: EUserRace;

  constructor(data: IAddProfileDto) {
    this.race = data.race;

    this.validate();
  }

  private validate(): void {
    new Validation(this.race, 'race').isDefined();
  }
}
