import { isDefined } from '../../../../tools/validation/index.js';
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
  @isDefined
  accessor name: string;
  @isDefined
  accessor race: ENpcRace;
  @isDefined
  accessor lvl: number;

  constructor(data: IAddCharacterDto) {
    this.name = data.name;
    this.lvl = data.lvl;
    this.race = data.race;
  }
}
