import { isDefined } from '../../../../tools/validation/index.js';
import type { ILoginDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ILoginDto:
 *       type: object
 *       properties:
 *         login:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$"
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 200
 *           pattern: "^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\\d).*$"
 *           description: Password should contain at least 1 digit, 6 letters, 1 uppercase letter, and 1 lowercase letter.
 */
export default class LoginDto implements ILoginDto {
  @isDefined
  accessor login: string;
  @isDefined
  accessor ip: string;
  @isDefined
  accessor password: string;

  constructor(data: ILoginDto, ip: string) {
    this.login = data.login;
    this.password = data.password;
    this.ip = ip;
  }
}
