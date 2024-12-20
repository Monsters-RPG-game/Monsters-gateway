import AbstractController from '../../../../tools/abstractions/controller.js';
import type AddSingleSkillDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ISingleSkillEntity } from '../../entity.js';

export default class AddSingleSkillController extends AbstractController<ISingleSkillEntity> {
  override async execute(data: AddSingleSkillDto, res: types.IResponse): Promise<ISingleSkillEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.singleSkill.add(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
