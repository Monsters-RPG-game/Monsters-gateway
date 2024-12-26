import type { IProfileEntity } from '../modules/profile/entity.js';

export interface IProfileUpdate {
  state: Partial<IProfileEntity>;
}
