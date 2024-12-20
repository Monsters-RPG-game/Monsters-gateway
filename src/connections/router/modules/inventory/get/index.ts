import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IInventoryItem } from '../../../../../modules/inventory/subModules/get/types.js';
import type express from 'express';

export default class InventoryRouter extends AbstractRouter<IInventoryItem[]> {
  override async execute(req: express.Request): Promise<IInventoryItem[]> {
    return this.controller.execute(req);
  }
}
