import { isDefined } from '../../../../tools/validation/index.js';
import type { IAddBugReport } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddBugReport:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
export default class AddBugReport implements IAddBugReport {
  @isDefined
  accessor message: string;
  @isDefined
  accessor user: string;

  constructor(body: IAddBugReport, user: string) {
    this.message = body.message;
    this.user = user;
  }
}
