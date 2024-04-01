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
export interface IAddProfileDto {
  race: EUserRace;
}
