import type AddKey from './add.js';
import type { JWK } from 'jose';

export interface IAddKey {
  kty: string;
  n: string;
  e: string;
  d: string;
  p: string;
  q: string;
  dp: string;
  dq: string;
  qi: string;
}

export interface IKeyRepository {
  add(user: AddKey): Promise<string>;
  get(id: string): Promise<JWK | null>;
  getAll(): Promise<JWK[]>;
}
