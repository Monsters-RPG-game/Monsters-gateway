import type NpcStoryDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { INpcStoryEntity } from '../../entity.js';

export default class NpcStoryController implements types.IAbstractSubController<INpcStoryEntity> {
  async execute(data: NpcStoryDto, res: types.IResponse): Promise<INpcStoryEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.story.getNpcStory(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
