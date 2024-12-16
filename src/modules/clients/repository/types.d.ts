import type AddClient from './add/dto.js';
import type mongoose from 'mongoose';

export interface IClientEntity {
  _id?: string | mongoose.Types.ObjectId;
  clientId: string;
  failUrl: string;
  redirectUri: string;
}

export interface IClient extends IClientEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IClientRepository {
  add(user: AddClient): Promise<string>;
  get(id: string): Promise<IClientEntity | null>;
  getByName(clientId: string): Promise<IClientEntity | null>;
}
