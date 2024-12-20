import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetFightLogsDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IFightLogsEntity } from '../../entity.js';

export default class GetFightLogsController extends AbstractController<IFightLogsEntity> {
  override async execute(data: GetFightLogsDto, res: types.IResponse): Promise<IFightLogsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.fights.getLogs(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
