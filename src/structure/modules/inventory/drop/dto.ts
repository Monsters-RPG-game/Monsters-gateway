import Validation from '../../../../tools/validation/index.js';
import type { IDropItemDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IDropItemDto:
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
export default class InventoryDropDto implements IDropItemDto {
  itemId: string;
  amount: number;

  constructor(body: IDropItemDto) {
    this.itemId = body.itemId;
    this.amount = body.amount;

    this.validate();
  }

  validate(): void {
    new Validation(this.itemId, 'itemId').isDefined();
    new Validation(this.amount, 'amount').isDefined();
  }
}
