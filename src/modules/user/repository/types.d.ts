import type AddUser from './add/dto.js';
import type mongoose from 'mongoose';

export interface IUserEntity {
  _id?: string | mongoose.Types.ObjectId;
  userId: string;
  login: string;
}

export interface IUser extends IUserEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IUserRepository {
  add(user: AddUser): Promise<string>;
  get(id: string): Promise<IUserEntity | null>;
  getByName(name: string): Promise<IUserEntity | null>;
  getByUserId(iserOd: string): Promise<IUserEntity | null>;
  removeById(userId: string): Promise<void>;
}
