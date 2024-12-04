import ReadMessagesDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IReadMessageDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async patch(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new ReadMessagesDto(req.body as IReadMessageDto);
    await reqController.message.read(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
