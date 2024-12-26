import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IInventoryItem } from '../../../../../modules/inventory/subModules/get/types.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class InventoryRouter extends AbstractRouter<IInventoryItem[]> {
  async execute(res: IResponse): Promise<IInventoryItem[]> {
    return this.controller.execute(res);
  }
}
