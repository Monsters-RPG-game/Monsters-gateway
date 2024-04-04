import Validation from '../../../../tools/validation/index.js';
import type { IRegisterDto } from './types.d.js';

export default class RegisterDto implements IRegisterDto {
  email: string;
  login: string;
  password: string;

  constructor(data: IRegisterDto) {
    this.email = data.email?.trim();
    this.login = data.login?.trim();
    this.password = data.password;

    this.validate();
  }

  validate(): void {
    new Validation(this.email, 'email').isDefined();
    new Validation(this.login, 'login').isDefined();
    new Validation(this.password, 'password').isDefined();
  }
}
