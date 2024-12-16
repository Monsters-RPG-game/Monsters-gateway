import type AddKey from './add/dto.js';
import type mongoose from 'mongoose';

export interface IKeyEntity {
  _id?: string | mongoose.Types.ObjectId;
  kty: string;
  kid: string;
  alg: string;
  e: string;
  n: string;
  d: string;
  p: string;
  q: string;
  dp: string;
  dq: string;
  qi: string;
}

export interface IKey extends IKeyEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IKeyRepository {
  add(user: AddKey): Promise<string>;
  get(id: string): Promise<IKeyEntity | null>;
  getAll(): Promise<IKeyEntity[]>;
}
