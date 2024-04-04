import Validation from '../../../../tools/validation/index.js';
import type { ICreateFightDto, IFightStateTeam } from './types.d.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICreateFightDto:
 *       type: object
 *       properties:
 *         attacker:
 *           type: string
 *         teams:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/IStateTeam'
 */
export default class CreateFightDto implements ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]] = [[], []];
  attacker: string;

  constructor(body: ICreateFightDto) {
    this.teams = body.teams;
    this.attacker = body.attacker;

    this.validate();
  }

  validate(): void {
    new Validation(this.teams, 'teams').isArray().minElements(2).maxElements(2);
    new Validation(this.attacker, 'attacker').isDefined();

    this.teams.forEach((t) => {
      new Validation(t, 'team').isArray();
    });
  }
}
