import Validation from '../../../tools/validation.js';
import type { IAddKey } from './types.js';
import type { JWK } from 'jose';

export default class AddKey implements IAddKey {
  readonly key: JWK;

  constructor(data: JWK) {
    this.key = data;

    this.validate();
  }

  private validate(): void {
    new Validation(this.key, 'key').isDefined();
  }
}
