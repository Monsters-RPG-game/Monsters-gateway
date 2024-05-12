export interface IGetMapDto {
  name?: string;
  id?: string;
}

export interface IMapEntity {
  _id: string;
  name: string;
  height: number;
  width: number;
  fields: number[];
}
