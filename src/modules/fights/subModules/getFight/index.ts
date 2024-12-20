import AbstractController from '../../../../tools/abstractions/controller.js';
import UserDetailsDto from '../../../users/subModules/details/dto.js';
import type GetFightsDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IUserEntity } from '../../../users/entity.js';
import type { IFight } from '../../entity.js';

export default class GetFightsController extends AbstractController<IFight[]> {
  override async execute(data: GetFightsDto, res: types.IResponse): Promise<IFight[]> {
    const { reqController, tempId, userId } = res.locals;

    const { payload } = await reqController.fights.getFights(data, {
      userId,
      tempId,
    });
    return this.prepareNames(payload, res.locals);
  }

  private async prepareNames(data: IFight[], locals: types.IUserLocals): Promise<IFight[]> {
    return Promise.all(
      data.map(async (d) => {
        return {
          ...d,
          attacker: await this.findTarget(d.attacker, locals),
        };
      }),
    );
  }

  private async findTarget(target: string, locals: types.IUserLocals): Promise<string> {
    const { reqController, userId, tempId } = locals;

    return (
      (
        await reqController.user.getDetails([new UserDetailsDto({ id: target })], {
          userId,
          tempId,
        })
      ).payload[0] as IUserEntity
    ).login;
  }
}
