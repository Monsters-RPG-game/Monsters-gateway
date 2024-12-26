import type AddNpcDto from './dto.js';
import type * as types from '../../../../types/index.js';

export default class AddNpcController implements types.IAbstractSubController<void> {
  async execute(data: AddNpcDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    await reqController.npc.add(data, {
      userId,
      tempId,
    });
  }
}
