import GetPartyDto from '../../../../../modules/party/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetPartyReq } from './types.js';
import type { IPartyEntity } from '../../../../../modules/party/entity.js';

export default class PartyRouter extends AbstractRouter<IPartyEntity> {
  async execute(req: IGetPartyReq): Promise<IPartyEntity> {
    const dto = new GetPartyDto(req.query);

    return this.controller.execute(dto, req);
  }
}
