import ReadMessagesDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IReadMessageDto } from './types.d.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async patch(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new ReadMessagesDto(req.body as IReadMessageDto);
    await reqHandler.message.read(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
