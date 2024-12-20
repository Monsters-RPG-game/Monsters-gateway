import AbstractController from '../../../../tools/abstractions/controller.js';
import type NarratorStoryDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { INarratorStoryEntity } from '../../entity.js';

export default class NarratorStoryController extends AbstractController<INarratorStoryEntity> {
  override async execute(data: NarratorStoryDto, res: types.IResponse): Promise<INarratorStoryEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.story.getNarratorStory(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
