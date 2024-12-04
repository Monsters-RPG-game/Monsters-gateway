import type { EServices } from '../../enums/index.js';

export type IModulesHealth = {
  [E in EServices]: boolean;
};

export interface IHealth extends IModulesHealth {
  alive: number;
}
