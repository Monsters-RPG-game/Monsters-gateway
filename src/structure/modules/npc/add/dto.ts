import Validation from '../../../../tools/validation/index.js';
import type { IAddCharacterDto } from './types.js';
import type { ENpcRace } from '../../../../enums/index.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddCharacterDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         race:
 *           type: string
 *           schema:
 *             oneOf:
 *               - human
 *               - elf
 *               - orc
 *               - dwarf
 *               - goblin
 *               - fairy
 *               - dragonBorn
 *               - troll
 *         lvl:
 *           type: number
 */
export default class AddCharacterDto implements IAddCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;

  constructor(data: IAddCharacterDto) {
    this.name = data.name;
    this.lvl = data.lvl;
    this.race = data.race;

    this.validate();
  }

  private validate(): void {
    new Validation(this.lvl, 'lvl').isDefined();
    new Validation(this.name, 'name').isDefined();
    new Validation(this.race, 'race').isDefined();
  }
}
