import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetByIntentDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ILine } from '../../types.js';

export default class GetByIntentController extends AbstractController<ILine> {
  override async execute(data: GetByIntentDto, res: types.IResponse): Promise<ILine> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.story.getIntent(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
