import { isDefined } from '../../../../tools/validation/index.js';
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
  @isDefined
  accessor target: string;

  constructor(body: IAttackDto) {
    this.target = body.target;
  }
}
