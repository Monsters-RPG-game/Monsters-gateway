import type { ENpcRace } from '../../../enums/index.ts';

export interface IGetCharacterDto {
  race?: ENpcRace;
  lvl?: number;
  id?: string[];
  page: number;
}
