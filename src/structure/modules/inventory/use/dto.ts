import Validation from '../../../../tools/validation/index.js';
import type { IUseItemDto } from './types.d.js';

export default class InventoryUseDto implements IUseItemDto {
  itemId: string;
  amount: number;

  constructor(data: IUseItemDto) {
    this.itemId = data.itemId;
    this.amount = data.amount;

    this.validate();
  }

  validate(): void {
    new Validation(this.itemId, 'itemId').isDefined();
    new Validation(this.amount, 'amount').isDefined();
  }
}
