import { EUserTypes } from '../../../../enums/user.js';
import { NoPermission } from '../../../../errors/index.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetNpcDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ICharacterEntity } from '../../entity.js';

export default class GetNpcController extends AbstractController<ICharacterEntity[]> {
  override async execute(data: GetNpcDto, res: types.IResponse): Promise<ICharacterEntity[]> {
    const { reqController, tempId, userId, user } = res.locals;

    // Only admin should be allowed to fetch all data without restrictions
    if (data.lvl === undefined || (data.race === undefined && user?.type !== EUserTypes.Admin)) {
      throw new NoPermission();
    }

    return (
      await reqController.npc.get(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
