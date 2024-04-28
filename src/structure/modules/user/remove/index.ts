import RemoveUserDto from './dto.js';
import { NoPermissionToRemoveAccount } from '../../../../errors/index.js';
import State from '../../../../state.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import { revokeUserToken } from '../../../../tools/token.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async delete(_req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { userId } = locals;

    await State.redis.addAccountToRemove(userId as string);
  }

  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler, userId } = locals;

    const data = new RemoveUserDto(req.body as RemoveUserDto, userId as string);
    const canRemove = await State.redis.getAccountToRemove(userId as string);
    if (!canRemove) throw new NoPermissionToRemoveAccount();

    await reqHandler.user.delete(data, { userId: locals.userId, tempId: locals.tempId });
    await revokeUserToken(
      ((req.cookies as Record<string, string>)['monsters.uid'] as string) ??
        (req.headers.authorization !== undefined ? req.headers.authorization.split('Bearer')[1]!.trim() : undefined),
    );
    await State.redis.removeCachedUser(locals.userId as string);
    await State.redis.removeAccountToRemove(userId as string);
  }
}
