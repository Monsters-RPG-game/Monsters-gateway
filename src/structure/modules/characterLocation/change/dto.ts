import Validation, { isDefined } from '../../../../tools/validation/index.js';
import type { IChangeCharacterLocationDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IChangeCharacterLocationDto:
 *       type: object
 *       properties:
 *         x:
 *           type: number
 *         y:
 *           type: number
 *         map:
 *           type: string
 *           required: false
 */
export default class ChangeCharacterLocationDto implements IChangeCharacterLocationDto {
  @isDefined
  accessor x: number;
  @isDefined
  accessor y: number;
  map?: string;

  constructor(data: IChangeCharacterLocationDto) {
    this.x = data.x;
    this.y = data.y;
    this.map = data.map;

    this.validate();
  }

  private validate(): void {
    if (this.map) new Validation(this.map, 'map').isDefined();
  }
}
