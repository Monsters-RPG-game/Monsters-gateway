import type { ENpcRace } from '../../../../enums';

export interface IUpdateCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;
  id: string;
}
