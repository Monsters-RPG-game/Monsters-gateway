import AddProfileDto from './dto.js';
import State from '../../../../state.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddProfileDto } from './types.d.js';
import type { IUsersTokens } from '../../../../types/index.d.js';
import type { IUserEntity } from '../../user/entity.d.js';
import type { IProfileEntity } from '../entity.d.js';
import type express from 'express';

export default class AddProfileRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new AddProfileDto(req.body as IAddProfileDto);
    await reqHandler.profile.add(data, { userId: locals.userId, tempId: locals.tempId });
    await State.redis.addCachedUser({
      account: locals.user as IUserEntity,
      profile: { ...(locals.profile as IProfileEntity), initialized: true },
    });

    return { state: { initialized: true, race: data.race } };
  }
}
