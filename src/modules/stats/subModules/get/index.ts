import type GetStatsDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IStatsEntity } from '../../entity.js';

export default class GetStatsController implements types.IAbstractSubController<IStatsEntity> {
  async execute(data: GetStatsDto, res: types.IResponse): Promise<IStatsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.stats.get(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
