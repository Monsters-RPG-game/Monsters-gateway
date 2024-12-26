import type GetDetailedDto from './dto.js';
import type * as types from '../../../../types/index.js';
import type { IDetailedSkillsEntity } from '../../entity.js';

export default class GetSkillsController implements types.IAbstractSubController<IDetailedSkillsEntity> {
  async execute(data: GetDetailedDto, res: types.IResponse): Promise<IDetailedSkillsEntity> {
    const { reqController, tempId, userId } = res.locals;

    return (
      await reqController.skills.getDetailed(data, {
        userId,
        tempId,
      })
    ).payload;
  }
}
