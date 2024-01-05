import GetProfileDto from './dto';
import RouterFactory from '../../../../tools/abstracts/router';
import type { IUsersTokens } from '../../../../types';
import type { IProfileEntity } from '../entity';
import type express from 'express';

export default class GetProfileRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IProfileEntity> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetProfileDto(req.query.id as string);
    return (await reqHandler.profile.get(data, locals)).payload;
  }
}
