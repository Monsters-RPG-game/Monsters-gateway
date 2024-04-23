import Validation from '../../../../tools/validation/index.js';
import type { IGetCharacterDto } from './types.d.js';
import type { ENpcRace } from '../../../../enums';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetCharacterDto:
 *     parameters:
 *      - in: query
 *        name: lvl
 *        required: true
 *        schema:
 *          type: number
 *      - in: query
 *        name: race
 *        required: true
 *        schema:
 *          oneOf:
 *            - human
 *            - elf
 *            - orc
 *            - dwarf
 *            - goblin
 *            - fairy
 *            - dragonBorn
 *            - troll
 */
export default class GetCharacterDto implements IGetCharacterDto {
  race?: ENpcRace;
  lvl?: number;
  page: number;

  constructor(data: IGetCharacterDto) {
    this.race = data.race;
    this.lvl = data.lvl;
    this.page = data.page ?? 1;

    this.validate();
  }

  private validate(): void {
    if (this.lvl) new Validation(this.lvl, 'lvl').isDefined();
    if (this.race) new Validation(this.race, 'race').isDefined();
  }
}
