import { NoDataProvidedError } from '../../../../errors/index.js';
import Validation from '../../../../tools/validation/index.js';
import type { IUpdateMapFields, IUpdateMapDto } from './types.js';
import type { IMapEntity } from '../get/types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUpdateMapDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: false
 *         height:
 *           type: number
 *           required: false
 *         width:
 *           type: number
 *           required: false
 *         fields:
 *           type: array
 *           required: false
 *           items:
 *             type: object
 *             properties:
 *               x:
 *                 type: number
 *                 required: false
 *               y:
 *                 type: number
 *                 required: false
 *               type:
 *                 type: string
 *                 required: false
 *                 schema:
 *                   oneOf:
 *                     - field
 *                     - woods
 *               access:
 *                 type: object
 *                 required: false
 *                 properties:
 *                   top:
 *                     type: boolean
 *                     required: false
 *                   left:
 *                     type: boolean
 *                     required: false
 *                   right:
 *                     type: boolean
 *                     required: false
 *                   bottom:
 *                     type: boolean
 *                     required: false
 */
export default class UpdateMapDto implements IUpdateMapDto {
  id: string;
  map: Partial<
    IMapEntity & {
      fields?: IUpdateMapFields[];
    }
  > = {};

  constructor(data: Partial<Omit<IMapEntity, '_id'>>, _id: string) {
    this.id = _id;
    this.map.name = data.name;
    this.map.height = data.height;
    this.map.width = data.width;
    this.map.fields = data.fields;

    this.validate();
  }

  private validate(): void {
    if (
      (!this.map.name && this.map.height === undefined && this.map.width === undefined && !this.map.fields) ||
      (this.map.fields?.length ?? 0) <= 0
    ) {
      throw new NoDataProvidedError();
    }

    new Validation(this.id, 'id').isDefined();
    if (this.map.name) new Validation(this.map.name, 'name').isDefined();
    if (this.map.height) new Validation(this.map.height, 'height').isDefined();
    if (this.map.width) new Validation(this.map.width, 'width').isDefined();
  }
}
