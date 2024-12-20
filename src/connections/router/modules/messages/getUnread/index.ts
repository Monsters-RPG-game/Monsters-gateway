import GetUnreadMessagesDto from '../../../../../modules/messages/subModules/getUnread/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetUnreadMessagesReq } from './types.js';
import type { IUnreadMessage } from '../../../../../modules/messages/subModules/getUnread/types.js';

export default class MessagesRouter extends AbstractRouter<IUnreadMessage[]> {
  override async execute(req: IGetUnreadMessagesReq): Promise<IUnreadMessage[]> {
    const dto = new GetUnreadMessagesDto(req.query);

    return this.controller.execute(dto, req);
  }
}
