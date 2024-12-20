import DropItemDto from '../../../../../modules/inventory/subModules/drop/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IDropItemReq } from './types.js';

export default class InventoryRouter extends AbstractRouter<void> {
  override async execute(req: IDropItemReq): Promise<void> {
    const dto = new DropItemDto(req.body);

    return this.controller.execute(dto, req);
  }
}
