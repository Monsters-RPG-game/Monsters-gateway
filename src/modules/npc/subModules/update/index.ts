import AbstractController from '../../../../tools/abstractions/controller.js';
import type UpdateNpcDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class UpdateNpcController extends AbstractController<void> {
  override async execute(data: UpdateNpcDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.npc.update(data, {
      userId,
      tempId,
    });
  }
}
