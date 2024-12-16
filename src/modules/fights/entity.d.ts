import type { EFightAction } from '../../enums/index.js';

export interface IActionEntity {
  character: string;
  action: EFightAction;
  target: string;
  value: number;
}

export interface IFightLogsEntity {
  logs: { phase: number; actions: IActionEntity[] }[];
}

export interface IFightTeam {
  character: string;
  action: string;
  target: string;
  value: number;
}

export interface ICharacterStats {
  intelligence: number;
  strength: number;
  hp: number;
}

export interface IFightCharacterEntity {
  _id: string;
  lvl: number;
  stats: ICharacterStats;
}

export interface IStateTeam {
  character: IFightCharacterEntity;
  stats: string;
}

export interface IState {
  initialized: { enemy: IStateTeam[]; attacker: IStateTeam[] };
  current: { enemy: IStateTeam[]; attacker: IStateTeam[] };
}

export interface IFightEntity {
  _id: string;
  log: string;
  states: string;
  attacker: string;
  active: boolean;
  phase: number;
  start: string;
  finish: string;
}
