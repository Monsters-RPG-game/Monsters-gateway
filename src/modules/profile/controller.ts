import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import type AddExpDto from './addExp/dto.js';
import type { IProfileEntity } from './entity.js';
import type AddProfileDto from '../../modules/profile/add/dto.js';
import type GetProfileDto from '../../modules/profile/get/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';

export default class Profile extends ReqController {
  async get(
    data: GetProfileDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IProfileEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Profile,
      enums.EProfileTargets.Get,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IProfileEntity;
    };
  }

  async add(data: AddProfileDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Profile, enums.EProfileTargets.Create, userData, data);
  }

  async addExp(
    data: AddExpDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Send;
    payload: IProfileEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Profile,
      enums.EProfileTargets.AddExp,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Send;
      payload: IProfileEntity;
    };
  }
}
