import type AddToken from './add/dto.js';
import type mongoose from 'mongoose';

export interface ITokenEntity {
  _id?: string | mongoose.Types.ObjectId;
  userId: string;
  ttl: string;
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface ITokenRepository {
  add(user: AddToken): Promise<string>;
  getByUserId(userId: string): Promise<ITokenEntity | null>;
  get(id: string): Promise<ITokenEntity | null>;
  removeByUserId(userId: string): Promise<void>;
}
