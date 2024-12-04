import AddExpDto from './dto.js';
import State from '../../../state.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IAddExpDto } from './types.js';
import type { IProfileEntity } from '../entity.js';
import type express from 'express';
import type { IUsersTokens } from 'types/user.js';

export default class AddExpRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;
    const data = new AddExpDto(req.body as IAddExpDto);

    const profile = await reqController.profile.addExp(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });

    await State.redis.updateCachedUser(profile.payload.user, { profile: profile.payload });
    return { state: profile.payload };
  }
}
