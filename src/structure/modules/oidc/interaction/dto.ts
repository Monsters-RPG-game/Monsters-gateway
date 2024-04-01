import Validation from '../../../../tools/validation/index.js';
import type { ILoginDto } from './types.d.js';

export default class LoginDto implements ILoginDto {
  login: string;
  password: string;

  constructor(data: ILoginDto) {
    this.login = data.login;
    this.password = data.password;

    this.validate();
  }

  validate(): void {
    new Validation(this.login, 'login').isDefined();
    new Validation(this.password, 'password').isDefined();
  }
}
