import type { IMapLayer, IMapObjectLayer, IMapProperties, IMapTilesets } from './types';

export interface IMapEntity {
  _id: string;
  name: string;
  layers: IMapLayer[] | IMapObjectLayer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  properties: IMapProperties[];
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: IMapTilesets[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
  height: number;
  infinite: boolean;
}
