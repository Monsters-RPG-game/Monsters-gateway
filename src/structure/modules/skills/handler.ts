import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { ISkillsEntity } from './entity.js';
import type { ISkillsEntityDetailed } from './getDetailed/types.js';
import type { IUserBrokerInfo } from '../../../types/index.js';
import type AddSkillsDto from '../../modules/skills/add/dto.js';
import type GetSkillsDto from '../../modules/skills/get/dto.js';
import type GetDetailedSkillsDto from '../../modules/skills/getDetailed/dto.js';

export default class Skills extends ReqHandler {
  async getDetailed(
    data: GetDetailedSkillsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ISkillsEntityDetailed;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Skills,
      enums.ESkillsTargets.GetDetailedSkills,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ISkillsEntityDetailed;
    };
  }
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
