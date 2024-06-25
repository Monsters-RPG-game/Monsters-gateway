import { isDefined } from '../../../../tools/validation/index.js';
import type { IRemoveAccountDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IRemoveAccountDto:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 */
export default class RemoveUserDto implements IRemoveAccountDto {
  @isDefined
  accessor id: string;
  @isDefined
  accessor password: string;

  constructor(data: IRemoveAccountDto, name: string) {
    this.password = data.password;
    this.id = name;
  }
}
