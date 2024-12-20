import type { ECharacterState, EUserRace } from '../../enums';

export interface IProfileEntity {
  _id: string;
  user: string;
  race: EUserRace;
  friends: string[];
  lvl: number;
  exp: number;
  initialized: boolean;
  inventory: string;
  party: string;
  state: ECharacterState;
  stats: string;
  skills: string;
}
