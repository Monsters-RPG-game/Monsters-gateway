import type { EFieldUpdateActions } from '../../../enums/index.js';
import type { IMapFields } from '../get/types.js';

export interface IUpdateMapFields extends IMapFields {
  position: number;
  action: EFieldUpdateActions;
  newType?: number;
}

export interface IUpdateMapDto {
  _id: string;
  name?: string;
  remove?: boolean;
  fields?: IUpdateMapFields[];
  height?: number;
  width?: number;
}
