import Validation from '../../../tools/validation/index.js';
import type { IGetFightLogsDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetFightLogsDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 */
export default class GetFightLogsDto implements IGetFightLogsDto {
  id: string;

  constructor(body: IGetFightLogsDto) {
    this.id = body.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
