import type { IFightCharacterEntity } from '../../npc/entity.js';
import type { ISkillsEntityDetailed } from '../../skills/getDetailed/types.js';

export interface IFightStateTeam {
  character: IFightCharacterEntity;
}

export interface ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]];
  attacker: IFightCharacterEntity;
  skills: ISkillsEntityDetailed;
}

export interface ICreateFight {
  team: string[];
}
