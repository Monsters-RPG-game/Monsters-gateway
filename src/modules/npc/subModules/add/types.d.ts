import type { ENpcRace } from '../../../../enums/index.ts';

export interface IAddCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;
}
