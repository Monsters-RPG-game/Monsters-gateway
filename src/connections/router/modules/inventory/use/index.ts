import UseItemDto from '../../../../../modules/inventory/subModules/use/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IUseItemReq } from './types.js';
import type * as types from '../../../../../types/index.js';

export default class InventoryRouter extends AbstractRouter<void> {
  async execute(req: IUseItemReq, res: types.IResponse): Promise<void> {
    const dto = new UseItemDto(req.body);

    return this.controller.execute(dto, res);
  }
}
