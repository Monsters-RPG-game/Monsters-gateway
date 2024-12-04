import type { EUserTypes } from '../../enums/index.js';

export interface IUserEntity {
  _id: string;
  login: string;
  verified: boolean;
  type: EUserTypes;
}
