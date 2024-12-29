import type AddKey from './add.js';
import type { JWK } from 'jose';

export interface IAddKey {
  key: JWK;
}

export interface IKeyRepository {
  add(user: AddKey): Promise<string>;
  get(id: string): Promise<JWK | null>;
  getAll(): Promise<JWK[]>;
}
