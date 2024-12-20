import RemoveCharacterDto from '../../../../../modules/npc/subModules/remove/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IRemoveCharacterReq } from './types.js';

export default class NpcRouter extends AbstractRouter<void> {
  override async execute(req: IRemoveCharacterReq): Promise<void> {
    const dto = new RemoveCharacterDto(req.body);

    return this.controller.execute(dto, req);
  }
}
