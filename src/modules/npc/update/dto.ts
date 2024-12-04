import Validation from '../../../tools/validation/index.js';
import type { IUpdateCharacterDto } from './types.js';
import type { ENpcRace } from '../../../enums/index.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUpdateNpcDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         race:
 *           type: string
 *           oneOf:
 *             - human
 *             - elf
 *             - orc
 *             - dwarf
 *             - goblin
 *             - fairy
 *             - dragonBorn
 *             - troll
 *         name:
 *           type: string
 *         lvl:
 *           type: number
 */
export default class UpdateCharacterDto implements IUpdateCharacterDto {
  id: string;
  race: ENpcRace;
  name: string;
  lvl: number;

  constructor(data: IUpdateCharacterDto) {
    this.id = data.id;
    this.race = data.race;
    this.lvl = data.lvl;
    this.name = data.name;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined();
    new Validation(this.race, 'race').isDefined();
    new Validation(this.name, 'name').isDefined();
    new Validation(this.lvl, 'lvl').isDefined();
  }
}
