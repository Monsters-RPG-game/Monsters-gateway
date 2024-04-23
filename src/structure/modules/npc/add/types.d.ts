import type { ENpcRace } from '../../../../enums';

export interface IAddCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;
}
