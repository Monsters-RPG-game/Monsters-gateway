import { NoDataProvidedError } from '../../../../errors/index.js';
import Validation, { isDefined } from '../../../../tools/validation/index.js';
import type { IUpdateMapFields, IUpdateMapDto } from './types.js';

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
 *         remove:
 *           type: boolean
 *           require: false
 *         fields:
 *           type: array
 *           required: false
 *           items:
 *             type: number
 */
export default class UpdateMapDto implements IUpdateMapDto {
  @isDefined
  accessor _id: string;
  name?: string;
  remove?: boolean;
  fields?: IUpdateMapFields[];
  height?: number;
  width?: number;

  constructor(data: Omit<IUpdateMapDto, 'id'>, id: string) {
    this._id = id;
    this.remove = data.remove;
    this.fields = data.fields;
    this.width = data.width;
    this.height = data.height;

    this.validate();
  }

  private validate(): void {
    if (
      !this.name &&
      this.height === undefined &&
      !this.remove &&
      this.width === undefined &&
      (!this.fields || this.fields.length === 0)
    ) {
      throw new NoDataProvidedError();
    }

    new Validation(this._id, 'id').isDefined();
    if (this.name) new Validation(this.name, 'name').isDefined();
    if (this.height) new Validation(this.height, 'height').isDefined();
    if (this.width) new Validation(this.width, 'width').isDefined();
    if (this.fields) new Validation(this.fields, 'fields').isDefined();
    if (this.remove) new Validation(this.remove, 'remove').isDefined();
  }
}
