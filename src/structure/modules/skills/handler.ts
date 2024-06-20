import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type AddSkillsDto from './add/dto.js';
import type { ISkillsEntity } from './entity.js';
import type { IUserBrokerInfo } from '../../../types/index.js';
import type GetSkillsDto from '../../modules/skills/get/dto.js';

export default class Skills extends ReqHandler {
  async get(
    data: GetSkillsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ISkillsEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Skills,
      enums.ESkillsTargets.GetSkills,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ISkillsEntity;
    };
  }

  async add(
    data: AddSkillsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ISkillsEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Skills,
      enums.ESkillsTargets.AddSkills,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ISkillsEntity;
    };
  }
}
