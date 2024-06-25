import { isDefined } from '../../../../tools/validation/index.js';
import type { IUseItemDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUseItemDto:
 *       type: object
 *       properties:
 *         itemId:
 *           type: string
 *         amount:
 *           type: string
 *     parameters:
 *       - in: query
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: string
 */
export default class InventoryUseDto implements IUseItemDto {
  @isDefined
  accessor itemId: string;
  @isDefined
  accessor amount: number;

  constructor(data: IUseItemDto) {
    this.itemId = data.itemId;
    this.amount = data.amount;
  }
}
