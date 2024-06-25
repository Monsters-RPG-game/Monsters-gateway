import { isDefined } from '../../../../tools/validation/index.js';
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
  @isDefined
  accessor id: string;

  constructor(body: IGetFightLogsDto) {
    this.id = body.id;
  }
}
