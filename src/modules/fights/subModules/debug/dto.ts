import Validation from '../../../../tools/validation.js';
import type { ICreateFightDto, IFightStateTeam } from './types.js';
import type { IFightCharacterEntity } from '../../../npc/entity.js';
import type { IDetailedSkillsEntity } from '../../../skills/entity.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICreateFightDto:
 *       type: object
 *       properties:
 *         team:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               type: string
 */
export default class CreateFightDto implements ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]] = [[], []];
  attacker: IFightCharacterEntity;
  skills: IDetailedSkillsEntity;

  constructor(body: ICreateFightDto) {
    this.teams = body.teams;
    this.attacker = body.attacker;
    this.skills = body.skills;

    this.validate();
  }

  validate(): void {
    new Validation(this.teams, 'teams').isArray().minElements(2).maxElements(2);
    new Validation(this.attacker, 'attacker').isDefined();
    new Validation(this.skills, 'skills').isDefined();

    this.teams.forEach((t) => {
      new Validation(t, 'team').isArray();
    });
  }
}
