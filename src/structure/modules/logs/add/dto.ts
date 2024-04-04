import Validation from '../../../../tools/validation/index.js';
import type { IAddLogDto } from './types.d.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddLogDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         target:
 *           type: string
 */
export default class AddLogDto implements IAddLogDto {
  message: string;
  target: string;

  constructor(data: IAddLogDto) {
    this.message = data.message;
    this.target = data.target;

    this.validate();
  }

  validate(): void {
    new Validation(this.message, 'message').isDefined();
    new Validation(this.target, 'target').isDefined();
  }
}
