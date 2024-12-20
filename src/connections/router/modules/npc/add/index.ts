import AddCharacterDto from '../../../../../modules/npc/subModules/add/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IAddCharacterReq } from './types.js';

export default class NpcRouter extends AbstractRouter<void> {
  override async execute(req: IAddCharacterReq): Promise<void> {
    const dto = new AddCharacterDto(req.body);

    return this.controller.execute(dto, req);
  }
}
