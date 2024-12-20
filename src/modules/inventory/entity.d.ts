import type { IInventoryItem } from './subModules/get/types.js';

export interface IInventoryEntity {
  _id: string;
  userId: string;
  items: IInventoryItem[];
}
