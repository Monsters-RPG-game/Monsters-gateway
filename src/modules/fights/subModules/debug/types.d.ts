import type { IFightCharacterEntity } from '../../../npc/entity.js';
import type { IDetailedSkillsEntity } from '../../../skills/entity.js';

export interface IFightStateTeam {
  character: IFightCharacterEntity;
}

export interface ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]];
  attacker: IFightCharacterEntity;
  skills: IDetailedSkillsEntity;
}

export interface ICreateFight {
  team: string[];
}
