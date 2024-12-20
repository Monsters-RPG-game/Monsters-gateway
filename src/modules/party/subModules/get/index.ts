import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetPartyDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IPartyEntity } from '../../entity.js';

export default class GetPartyController extends AbstractController<IPartyEntity> {
  override async execute(data: GetPartyDto, res: types.IResponse): Promise<IPartyEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.party.get(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
