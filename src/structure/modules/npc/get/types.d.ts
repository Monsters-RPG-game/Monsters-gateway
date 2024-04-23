import type { ENpcRace } from '../../../../enums';

export interface IGetCharacterDto {
  race?: ENpcRace;
  lvl?: number;
  page: number;
}
