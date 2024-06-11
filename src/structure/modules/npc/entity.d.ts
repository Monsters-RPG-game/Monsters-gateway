import type { ENpcRace } from '../../../enums';

export interface ICharacterStats {
  intelligence: number;
  strength: number;
  hp: number;
}

export interface IStatsEntity extends ICharacterStats {
  _id: string;
}

export interface ICharacterEntity {
  _id: string;
  name: string;
  race: ENpcRace;
  lvl: number;
  exp: number;
  inventory: string;
  stats: IStatsEntity;
  party: string;
}

export interface IFightCharacterEntity {
  _id: string;
  lvl: number;
  stats: IStatsEntity;
}
