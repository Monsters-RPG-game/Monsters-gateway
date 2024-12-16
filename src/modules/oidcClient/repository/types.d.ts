import type AddOidcClient from './add/dto.js';
import type { EClientGrants } from '../../../enums/index.js';
import type mongoose from 'mongoose';

export interface IOidcClientEntity {
  _id?: string | mongoose.Types.ObjectId;
  clientId: string;
  clientSecret: string;
  redirectLogoutUrl: string;
  clientGrant: string;
  redirectUri: string;
}

export interface IOidcClient extends IOidcClientEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IOidcClientRepository {
  add(user: AddOidcClient): Promise<string>;
  get(id: string): Promise<IOidcClientEntity | null>;
  getByGrant(grant: EClientGrants): Promise<IOidcClientEntity | null>;
  getByName(clientId: string): Promise<IOidcClientEntity | null>;
}
