import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IProfileEntity } from './entity.js';
import type AddProfileDto from './subModules/add/dto.js';
import type AddExpDto from './subModules/addExp/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';
import type GetProfileDto from './subModules/get/dto.js';

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
