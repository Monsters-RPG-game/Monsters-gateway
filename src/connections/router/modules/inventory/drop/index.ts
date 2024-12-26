import DropItemDto from '../../../../../modules/inventory/subModules/drop/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IDropItemReq } from './types.js';
import type * as types from '../../../../../types/index.js';

export default class InventoryRouter extends AbstractRouter<void> {
  async execute(req: IDropItemReq, res: types.IResponse): Promise<void> {
    const dto = new DropItemDto(req.body);

    return this.controller.execute(dto, res);
  }
}
