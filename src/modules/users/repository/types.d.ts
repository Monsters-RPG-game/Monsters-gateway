import type { IUserEntity } from '../entity.js';
import type AddUser from './add.js';

export interface IAddUser {
  userId: string;
  login: string;
}

export interface IUserRepository {
  add(user: AddUser): Promise<string>;
  get(id: string): Promise<IUserEntity | null>;
  getByName(name: string): Promise<IUserEntity | null>;
  getByUserId(iserOd: string): Promise<IUserEntity | null>;
  removeById(userId: string): Promise<void>;
}
