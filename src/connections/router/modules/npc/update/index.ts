import UpdateCharacterDto from '../../../../../modules/npc/subModules/update/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IUpdateCharacterReq } from './types.js';

export default class NpcRouter extends AbstractRouter<void> {
  async execute(req: IUpdateCharacterReq): Promise<void> {
    const dto = new UpdateCharacterDto(req.body);

    return this.controller.execute(dto, req);
  }
}
