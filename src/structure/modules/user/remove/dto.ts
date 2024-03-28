import Validation from '../../../../tools/validation';
import type { IRemoveAccountDto } from './types';

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
