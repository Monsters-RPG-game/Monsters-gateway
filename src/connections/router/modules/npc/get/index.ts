import GetCharacterDto from '../../../../../modules/npc/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetCharacterReq } from './types.js';
import type { ICharacterEntity } from '../../../../../modules/npc/entity.js';

export default class NpcRouter extends AbstractRouter<ICharacterEntity[]> {
  override async execute(req: IGetCharacterReq): Promise<ICharacterEntity[]> {
    const dto = new GetCharacterDto(req.query);

    return this.controller.execute(dto, req);
  }
}
