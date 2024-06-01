import Validation from '../../../../tools/validation/index.js';
import type { ICreateMapDto } from './types.js';
import type { IMapLayer, IMapObjectLayer, IMapProperties, IMapTilesets } from '../types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICreateMapDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         layers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               x:
 *                 type: number
 *               y:
 *                 type: number
 *               opacity:
 *                 type: number
 *               id:
 *                 type: number
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               visible:
 *                 type: boolean
 *               draworder:
 *                 type: string
 *                 required: false
 *               objects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     x:
 *                       type: number
 *                     y:
 *                       type: number
 *                     visibile:
 *                       type: boolean
 *                     name:
 *                       type: string
 *                     width:
 *                       type: number
 *                     height:
 *                       type: number
 *                     rotation:
 *                       type: number
 *                     point:
 *                       type: boolean
 *                 required: false
 *               width:
 *                 type: number
 *                 required: false
 *               height:
 *                 type: number
 *                 required: false
 *               data:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 required: false
 *         nextlayerid:
 *           type: number
 *         nextobjectid:
 *           type: number
 *         orientation:
 *           type: string
 *         properties:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               value:
 *                 type: string
 *         renderorder:
 *           type: string
 *         tiledversion:
 *           type: string
 *         tileheight:
 *           type: number
 *         tilesets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tilewidth:
 *                 type: number
 *               tileheight:
 *                 type: number
 *               spacing:
 *                 type: number
 *               margin:
 *                 type: number
 *               image:
 *                 type: string
 *               columns:
 *                 type: number
 *               firstgid:
 *                 type: number
 *               tilecount:
 *                 type: number
 *               imagewidth:
 *                 type: number
 *               imageheight:
 *                 type: number
 *               tiles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                           type:
 *                             type: string
 *                     id:
 *                       type: number
 *               terrains:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     tile:
 *                       type: number
 *               grid:
 *                 type: object
 *                 properties:
 *                   orientation:
 *                     type: string
 *                   height:
 *                     type: number
 *                   width:
 *                     type: number
 *         tilewidth:
 *           type: number
 *         type:
 *           type: string
 *         version:
 *           type: number
 *         width:
 *           type: number
 *         height:
 *           type: number
 */
export default class CreateMapDto implements ICreateMapDto {
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

  constructor(data: ICreateMapDto) {
    this.name = data.name;
    this.layers = data.layers;
    this.nextlayerid = data.nextlayerid;
    this.nextobjectid = data.nextobjectid;
    this.orientation = data.orientation;
    this.properties = data.properties;
    this.renderorder = data.renderorder;
    this.tiledversion = data.tiledversion;
    this.tileheight = data.tileheight;
    this.tilesets = data.tilesets;
    this.tilewidth = data.tilewidth;
    this.type = data.type;
    this.width = data.width;
    this.version = data.version;
    this.height = data.height;
    this.infinite = data.infinite;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined();
    new Validation(this.nextlayerid, 'nextlayerid').isDefined();
    new Validation(this.nextobjectid, 'nextobjectid').isDefined();
    new Validation(this.orientation, 'orientation').isDefined();
    new Validation(this.renderorder, 'renderorder').isDefined();
    new Validation(this.tiledversion, 'tiledversion').isDefined();
    new Validation(this.tileheight, 'tileheight').isDefined();
    new Validation(this.tilewidth, 'tilewidth').isDefined();
    new Validation(this.type, 'type').isDefined();
    new Validation(this.version, 'version').isDefined();
    new Validation(this.width, 'width').isDefined();
    new Validation(this.width, 'height').isDefined();
    new Validation(this.infinite, 'infinite').isDefined();

    new Validation(this.layers, 'layers').isDefined();
    this.layers.forEach((l: IMapLayer | IMapObjectLayer) => {
      new Validation(l.x, 'x').isDefined();
      new Validation(l.y, 'y').isDefined();
      new Validation(l.opacity, 'opacity').isDefined();
      new Validation(l.id, 'id').isDefined();
      new Validation(l.type, 'type').isDefined();
      new Validation(l.name, 'name').isDefined();
      new Validation(l.visible, 'visible').isDefined();

      if (Object.hasOwn(l, 'draworder')) {
        const target = l as IMapObjectLayer;
        new Validation(target.draworder, 'draworder').isDefined();
        new Validation(target.objects, 'mapObjectLayer.objects').isDefined();
        target.objects.forEach((o) => {
          new Validation(o.type, 'mapObjectLayer.objects.type').isDefined();
          new Validation(o.x, 'mapObjectLayer.objects.x').isDefined();
          new Validation(o.y, 'mapObjectLayer.objects.y').isDefined();
          new Validation(o.visible, 'mapObjectLayer.objects.visible').isDefined();
          new Validation(o.name, 'mapObjectLayer.objects.name').isDefined();
          new Validation(o.width, 'mapObjectLayer.objects.width').isDefined();
          new Validation(o.height, 'mapObjectLayer.objects.height').isDefined();
          new Validation(o.rotation, 'mapObjectLayer.objects.rotation').isDefined();
          new Validation(o.point, 'mapObjectLayer.objects.point').isDefined();
        });
      } else {
        const target = l as IMapLayer;
        new Validation(target.width, 'mapLayer.width').isDefined();
        new Validation(target.height, 'mapLayer.height').isDefined();
        new Validation(target.data, 'mapLayer.data').isDefined();
      }
    });
    new Validation(this.properties, 'properties').isDefined();
    this.properties.forEach((p) => {
      new Validation(p.type, 'mapProperties.type').isDefined();
      new Validation(p.type, 'mapProperties.type').isDefined();
      new Validation(p.value, 'mapProperties.value').isDefined();
    });
    new Validation(this.tilesets, 'tilesets').isDefined();
    this.tilesets.forEach((t) => {
      new Validation(t.name, 'name').isDefined();
      new Validation(t.tilewidth, 'tilesets.tilewidth').isDefined();
      new Validation(t.tileheight, 'tilesets.tileheight').isDefined();
      new Validation(t.spacing, 'tilesets.spacing').isDefined();
      new Validation(t.margin, 'tilesets.margin').isDefined();
      new Validation(t.image, 'tilesets.image').isDefined();
      new Validation(t.columns, 'tilesets.columns').isDefined();
      new Validation(t.firstgid, 'tilesets.firstgid').isDefined();
      new Validation(t.tilecount, 'tilesets.tilecount').isDefined();
      new Validation(t.imagewidth, 'tilesets.imageWidth').isDefined();
      new Validation(t.imageheight, 'tilesets.imageHeight').isDefined();

      new Validation(t.tiles, 'tilesets.tiles').isDefined();
      t.tiles.forEach((tile) => {
        new Validation(tile.properties, 'properties').isDefined();
        tile.properties.forEach((p) => {
          new Validation(p.name, 'tilesets.tiles.name').isDefined();
          new Validation(p.value, 'tilesets.tiles.value').isDefined();
          new Validation(p.type, 'tilesets.tiles.type').isDefined();
        });
        new Validation(tile.id, 'tilesets.tiles.id').isDefined();
      });

      new Validation(t.terrains, 'tilesets.terrain').isDefined();
      t.terrains.forEach((ter) => {
        new Validation(ter.name, 'tilesets.terrain.name').isDefined();
        new Validation(ter.tile, 'tilesets.terrain.tile').isDefined();
      });

      new Validation(t.grid, 'tilesets.grid').isDefined();
      new Validation(t.grid.orientation, 'tilesets.grid.orientation').isDefined();
      new Validation(t.grid.height, 'tilesets.grid.height').isDefined();
      new Validation(t.grid.width, 'tilesets.grid.width').isDefined();
    });
  }
}
