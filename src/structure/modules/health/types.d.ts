import type { EServices } from '../../../enums/index.js';

export interface IHealth {
  alive: number;

  [key: EServices]: boolean;
}
