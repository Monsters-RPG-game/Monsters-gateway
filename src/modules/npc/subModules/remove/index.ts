import type RemoveNpcDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class RemoveNpcController implements types.IAbstractSubController<void> {
  async execute(data: RemoveNpcDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.npc.remove(data, {
      userId,
      tempId,
    });
  }
}
