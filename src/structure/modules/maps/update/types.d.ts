import type { IMapFields, IMapEntity } from '../get/types.js';

export interface IUpdateMapDto {
  id: string;
  map: Partial<Omit<IMapEntity, '_id'>>;
}

export interface IUpdateMapFields extends IMapFields {
  toRemove?: boolean;
}
