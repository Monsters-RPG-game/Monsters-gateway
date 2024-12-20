import ReadMessageDto from '../../../../../modules/messages/subModules/read/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IReadMessagesReq } from './types.js';

export default class MessagesRouter extends AbstractRouter<void> {
  override async execute(req: IReadMessagesReq): Promise<void> {
    const dto = new ReadMessageDto(req.body);

    return this.controller.execute(dto, req);
  }
}
