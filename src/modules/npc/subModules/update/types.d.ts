import type { ENpcRace } from '../../../../enums/index.ts';

export interface IUpdateCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;
  id: string;
}
