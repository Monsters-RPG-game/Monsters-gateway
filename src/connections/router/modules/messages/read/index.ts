import ReadMessageDto from '../../../../../modules/messages/subModules/read/dto.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { IReadMessagesReq } from './types.js';
import type { IResponse } from '../../../../../types/requests.js';

export default class MessagesRouter extends AbstractRouter<void> {
  async execute(req: IReadMessagesReq, res: IResponse): Promise<void> {
    const dto = new ReadMessageDto(req.body);

    return this.controller.execute(dto, res);
  }
}
