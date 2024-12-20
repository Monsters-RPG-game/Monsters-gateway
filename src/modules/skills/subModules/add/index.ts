import AbstractController from '../../../../tools/abstractions/controller.js';
import type AddByIntentDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ISkillsEntity } from '../../entity.js';

export default class AddSkillsController extends AbstractController<ISkillsEntity> {
  override async execute(data: AddByIntentDto, res: types.IResponse): Promise<ISkillsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.skills.add(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
