import Validation from '../../../../tools/validation/index.js';
import type { ICreateMapDto } from './types.js';
import type { IMapFields } from '../get/types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICreateMapDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         height:
 *           type: number
 *         width:
 *           type: number
 *         fields:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               x:
 *                 type: number
 *               y:
 *                 type: number
 *               type:
 *                 type: string
 *                 schema:
 *                   oneOf:
 *                     - field
 *                     - woods
 *               access:
 *                 type: object
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
export default class CreateMapDto implements ICreateMapDto {
  name: string;
  fields: IMapFields[];
  height: number;
  width: number;

  constructor(data: ICreateMapDto) {
    this.name = data.name;
    this.height = data.height;
    this.width = data.width;
    this.fields = data.fields;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined();
    new Validation(this.height, 'height').isDefined();
    new Validation(this.width, 'width').isDefined();
    new Validation(this.fields, 'fields').isDefined();

    this.fields.forEach((f) => {
      new Validation(f.x, `field.${f.x}/${f.y}.x`).isDefined();
      new Validation(f.y, `field.${f.x}/${f.y}.y`).isDefined();
      new Validation(f.type, `field.${f.x}/${f.y}.type`).isDefined();
      new Validation(f.access, `field.${f.x}/${f.y}.access`).isDefined();
    });
  }
}
