import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { ISkillsEntity, IDetailedSkillsEntity } from './entity.js';
import type AddSkillsDto from './subModules/add/dto.js';
import type GetSkillsDto from './subModules/get/dto.js';
import type GetDetailedSkillsDto from './subModules/getDetailed/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';

export default class Skills extends ReqController {
  async getDetailed(
    data: GetDetailedSkillsDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IDetailedSkillsEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Skills,
      enums.ESkillsTargets.GetDetailedSkills,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IDetailedSkillsEntity;
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
