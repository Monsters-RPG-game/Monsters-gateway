import type GetFightLogsDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IFightLogsEntity } from '../../entity.js';

export default class GetFightLogsController implements types.IAbstractSubController<IFightLogsEntity> {
  async execute(data: GetFightLogsDto, res: types.IResponse): Promise<IFightLogsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.fights.getLogs(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
