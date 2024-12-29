import type { EUserTypes } from '../../enums/index.js';
import type mongoose from 'mongoose';

export interface IUserEntity {
  _id?: string | mongoose.Types.ObjectId;
  userId: string;
  login: string;
  verified: boolean;
  type: EUserTypes;
}
