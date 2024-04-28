import RegisterDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new RegisterDto(req.body as RegisterDto);
    await reqHandler.user.register(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
