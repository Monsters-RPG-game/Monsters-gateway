import { isDefined } from '../../../../tools/validation/index.js';
import type { IAddProfileDto } from './types.js';
import type { EUserRace } from '../../../../enums/index.js';

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
  @isDefined
  accessor location: string;
  @isDefined
  accessor race: EUserRace;

  constructor(data: IAddProfileDto, location: string) {
    this.race = data.race;
    this.location = location;
  }
}
