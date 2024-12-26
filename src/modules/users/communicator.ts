import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IUserEntity } from './entity.js';
import type DebugGetAllUsersDto from './subModules/debug/dto.js';
import type UserDetailsDto from './subModules/details/dto.js';
import type * as types from '../../types/index.js';

export default class User extends ReqController {
  async getDetails(
    data: UserDetailsDto[],
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IUserEntity[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.User,
      enums.EUserTargets.GetName,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IUserEntity[];
    };
  }

  async debugGetAll(
    data: DebugGetAllUsersDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IUserEntity[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.User,
      enums.EUserTargets.DebugGetAll,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IUserEntity[];
    };
  }
}
