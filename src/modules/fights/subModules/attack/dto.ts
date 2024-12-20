import Validation from '../../../../tools/validation.js';
import type { IAttackDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAttackDto:
 *       type: object
 *       properties:
 *         target:
 *           type: string
 */
export default class AttackDto implements IAttackDto {
  target: string;

  constructor(body: IAttackDto) {
    this.target = body.target;

    this.validate();
  }

  validate(): void {
    new Validation(this.target, 'target').isDefined();
  }
}
