import GetUnreadMessagesDto from '../../../../../modules/messages/subModules/getUnread/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IGetUnreadMessagesReq } from './types.js';
import type { IUnreadMessage } from '../../../../../modules/messages/subModules/getUnread/types.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class MessagesRouter extends AbstractRouter<IUnreadMessage[]> {
  async execute(req: IGetUnreadMessagesReq, res: IResponse): Promise<IUnreadMessage[]> {
    const dto = new GetUnreadMessagesDto(req.query);

    return this.controller.execute(dto, res);
  }
}
