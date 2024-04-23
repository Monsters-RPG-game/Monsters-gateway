import type { EUserTypes } from '../../../enums';

export interface IUserEntity {
  _id: string;
  login: string;
  verified: boolean;
  type: EUserTypes;
}
