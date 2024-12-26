import type GetByIntentDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { ISkillsEntity } from '../../entity.js';

export default class GetSkillsController implements types.IAbstractSubController<ISkillsEntity> {
  async execute(data: GetByIntentDto, res: types.IResponse): Promise<ISkillsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.skills.get(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
