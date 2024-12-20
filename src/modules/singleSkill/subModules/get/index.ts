import AbstractController from '../../../../tools/abstractions/controller.js';
import type GetSingleSkillDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ISingleSkillEntity } from '../../entity.js';

export default class GetSingleSkillController extends AbstractController<ISingleSkillEntity> {
  override async execute(data: GetSingleSkillDto, res: types.IResponse): Promise<ISingleSkillEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.singleSkill.get(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
