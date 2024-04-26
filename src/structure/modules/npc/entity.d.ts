import type { ENpcRace } from '../../../enums';

export interface ICharacterStats {
  intelligence: number;
  strength: number;
}

export interface IStatsEntity extends ICharacterStats {
  _id: string;
}

export interface ICharacterEntity {
  _id: string;
  name: string;
  race: ENpcRace;
  lvl: number;
  inventory: string;
  stats: IStatsEntity;
  party: string;
}
