import type GetByStageDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IChapter } from '../../types.js';

export default class GetByStageController implements types.IAbstractSubController<IChapter> {
  async execute(data: GetByStageDto, res: types.IResponse): Promise<IChapter> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.story.getByStage(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
