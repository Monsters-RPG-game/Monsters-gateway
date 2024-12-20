import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IHealth } from '../../../../../modules/health/subModules/get/types.js';

export default class InventoryRouter extends AbstractRouter<IHealth> {
  override async execute(): Promise<IHealth> {
    return this.controller.execute(undefined);
  }
}
