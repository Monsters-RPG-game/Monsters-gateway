import UseItemDto from '../../../../../modules/inventory/subModules/use/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IUseItemReq } from './types.js';

export default class InventoryRouter extends AbstractRouter<void> {
  override async execute(req: IUseItemReq): Promise<void> {
    const dto = new UseItemDto(req.body);

    return this.controller.execute(dto, req);
  }
}
