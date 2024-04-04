import Validation from '../../../../tools/validation/index.js';
import type { IRemoveAccountDto } from './types.d.js';

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
  id: string;
  password: string;

  constructor(data: IRemoveAccountDto, name: string) {
    this.password = data.password;
    this.id = name;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
    new Validation(this.password, 'password').isDefined();
  }
}
