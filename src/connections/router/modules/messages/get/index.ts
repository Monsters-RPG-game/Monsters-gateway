import GetMessagesDto from '../../../../../modules/messages/subModules/get/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetMessagesReq } from './types.js';
import type { IFullMessageEntity } from '../../../../../modules/messages/entity.js';
import type { IPreparedMessagesBody } from '../../../../../modules/messages/subModules/get/types.js';

export default class MessagesRouter extends AbstractRouter<
  Record<string, IPreparedMessagesBody> | IFullMessageEntity[]
> {
  override async execute(req: IGetMessagesReq): Promise<Record<string, IPreparedMessagesBody> | IFullMessageEntity[]> {
    const dto = new GetMessagesDto(req.query);

    return this.controller.execute(dto, req);
  }
}
