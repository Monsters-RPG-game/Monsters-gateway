export interface IFightStateTeam {
  character: string;
}

export interface ICreateFightDto {
  teams: [IFightStateTeam[], IFightStateTeam[]];
  attacker: string;
}

export interface ICreateFight {
  team: string[];
}
