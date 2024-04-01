import RemoveUserDto from './dto.js';
import { NoPermissionToRemoveAccount } from '../../../../errors/index.js';
import State from '../../../../state.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import { revokeUserToken } from '../../../../tools/token.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type express from 'express';

export default class UserRouter extends RouterFactory {
  async delete(_req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { user } = locals;

    await State.redis.addAccountToRemove(user?._id as string);
  }

  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler, user } = locals;

    const data = new RemoveUserDto(req.body as RemoveUserDto, user?._id as string);
    const canRemove = await State.redis.getAccountToRemove(user?._id as string);
    if (!canRemove) throw new NoPermissionToRemoveAccount();

    await reqHandler.user.delete(data, { userId: locals.userId, tempId: locals.tempId });
    await revokeUserToken(
      ((req.cookies as Record<string, string>)['monsters.uid'] as string) ??
        (req.headers.authorization !== undefined ? req.headers.authorization.split('Bearer')[1]!.trim() : undefined),
    );
    await State.redis.removeCachedUser(locals.userId as string);
    await State.redis.removeAccountToRemove(user?._id as string);
  }
}
