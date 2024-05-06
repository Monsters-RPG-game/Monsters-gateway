import type { EFieldType } from '../../enums';

export interface IGetMapDto {
  name?: string;
  id?: string;
}

export interface IMapFields {
  x: number;
  y: number;
  type: EFieldType;
  access: {
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
  };
}

export interface IMapEntity {
  _id: string;
  name: string;
  height: number;
  width: number;
  fields: IMapFields[];
}
