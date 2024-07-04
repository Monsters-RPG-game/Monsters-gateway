import GetFightDto from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import UserDetailsDto from '../../user/details/dto.js';
import type * as types from '../../../../types/index.js';
import type { IUserEntity } from '../../user/entity.js';
import type { IFight } from '../entity.js';
import type express from 'express';

export default class FightRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IFight[]> {
    console.log('______________________1Get')
    const locals = res.locals as types.IUsersTokens;
    const { reqHandler } = locals;

    const data = new GetFightDto(
      {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        active: !!req.query.active,
      },
      locals.user?._id as string,
    );

    const { payload } = await reqHandler.fights.getFights(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
    console.log('@)@))@@)',payload)
    return this.prepareNames(payload, locals);
  }

  private async prepareNames(data: IFight[], locals: types.IUsersTokens): Promise<IFight[]> {
    return Promise.all(
      data.map(async (d) => {
        return {
          ...d,
          attacker: await this.findTarget(d.attacker, locals),
        };
      }),
    );
  }

  private async findTarget(target: string, locals: types.IUsersTokens): Promise<string> {
    const { reqHandler } = locals;

    return (
      (
        await reqHandler.user.getDetails([new UserDetailsDto({ id: target })], {
          userId: locals.userId,
          tempId: locals.tempId,
        })
      ).payload[0] as IUserEntity
    ).login;
  }
}
