import type { EFightAction } from '../../enums/index.js';
import type { IFightCharacterEntity } from '../npc/entity.js';

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

export interface IStateTeam {
  character: IFightCharacterEntity;
  stats: string;
}

export interface IState {
  initialized: { enemy: IStateTeam[]; attacker: IStateTeam[] };
  current: { enemy: IStateTeam[]; attacker: IStateTeam[] };
}

export interface IFightEntity {
  log: string;
  states: string;
  attacker: string;
  active: boolean;
  phase: number;
}

export interface IFight extends Omit<IFightEntity, 'log' | 'states'> {
  states: IState;
  log: IFightLogsEntity;
}
