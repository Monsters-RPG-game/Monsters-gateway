export interface IGetCharacterLocationDto {
  character?: string;
  id?: string;
}

export interface ICharacterLocationEntity {
  _id: string;
  character: string;
  x: number;
  y: number;
  map: string;
}
