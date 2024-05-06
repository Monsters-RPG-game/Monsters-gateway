import ChangeCharacterLocationDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IChangeCharacterLocationDto } from './types.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class ChangeCharacterLocationRouter extends RouterFactory {
  async change(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new ChangeCharacterLocationDto(req.body as IChangeCharacterLocationDto);

    await reqHandler.characterLocation.change(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
  }
}
