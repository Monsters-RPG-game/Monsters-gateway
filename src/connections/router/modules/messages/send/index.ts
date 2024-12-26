import SendMessageDto from '../../../../../modules/messages/subModules/send/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { ISendMessagesReq } from './types.js';

export default class MessagesRouter extends AbstractRouter<void> {
  async execute(req: ISendMessagesReq): Promise<void> {
    const dto = new SendMessageDto(req.body, 'Temporary random string, due to refactoring');

    return this.controller.execute(dto, req);
  }
}
