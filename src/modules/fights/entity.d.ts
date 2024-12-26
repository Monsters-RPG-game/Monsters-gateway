import type { EFightActions } from '../../enums/controllers.js';
import type { EFightStatus } from '../../enums/fights.js';
import type { IFightCharacterEntity } from '../npc/entity.js';
import type { IProfileEntity } from '../profile/entity.js';

export interface IActionEntity {
  character: string;
  action: EFightActions;
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

export interface IAttackEntity {
  data: { logs: IActionEntity[]; status: EFightStatus };
  state?: Partial<IProfileEntity>;
}
