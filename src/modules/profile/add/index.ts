import AddProfileDto from './dto.js';
import State from '../../../state.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import CreateCharacterLocationDto from '../../characterLocation/create/dto.js';
import type { IAddProfileDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type { IUserEntity } from '../../user/entity.js';
import type { IProfileEntity } from '../entity.js';
import type express from 'express';

export default class AddProfileRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<{ state: Partial<IProfileEntity> }> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const location = (
      await reqController.characterLocation.create(
        new CreateCharacterLocationDto({ character: locals.userId as string }),
        { userId: locals.userId, tempId: locals.tempId },
      )
    ).payload;
    const data = new AddProfileDto(req.body as IAddProfileDto, location.id);
    await reqController.profile.add(data, { userId: locals.userId, tempId: locals.tempId });
    await State.redis.addCachedUser({
      account: locals.user as IUserEntity,
      profile: { ...(locals.profile as IProfileEntity), initialized: true },
    });

    return { state: { initialized: true, race: data.race } };
  }
}
