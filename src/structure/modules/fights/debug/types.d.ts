import type { IFightCharacterEntity } from '../../npc/entity.js';

export interface IFightStateTeam {
  character: IFightCharacterEntity;
}

export interface ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]];
  attacker: IFightCharacterEntity;
}

export interface ICreateFight {
  team: string[];
}
