import GetFightDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import UserDetailsDto from '../../user/details/dto.js';
import type * as types from '../../../types/index.js';
import type { IUserEntity } from '../../user/entity.js';
import type { IFightEntity } from '../entity.js';
import type express from 'express';

export default class FightRouter extends RouterFactory {
  async get(req: express.Request, res: express.Response): Promise<IFightEntity[]> {
    const locals = res.locals as types.IUsersTokens;
    const { reqController } = locals;

    const data = new GetFightDto(
      {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        active: !!req.query.active,
      },
      locals.user?._id as string,
    );

    const { payload } = await reqController.fights.getFights(data, {
      userId: locals.userId,
      tempId: locals.tempId,
    });
    return this.prepareNames(payload, locals);
  }

  private async prepareNames(data: IFightEntity[], locals: types.IUsersTokens): Promise<IFightEntity[]> {
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
    const { reqController } = locals;

    return (
      (
        await reqController.user.getDetails([new UserDetailsDto({ id: target })], {
          userId: locals.userId,
          tempId: locals.tempId,
        })
      ).payload[0] as IUserEntity
    ).login;
  }
}
