import type { JWK } from 'jose';

export interface ILoginKeys {
  id: number;
  expiration: Date;
  key: JWK;
}
