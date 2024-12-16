import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import type DebugGetAllUsersDto from './debug/dto.js';
import type { IUserEntity } from './entity.js';
import type UserDetailsDto from '../../modules/user/details/dto.js';
import type RegisterDto from '../../modules/user/register/dto.js';
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
  async register(data: RegisterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.User, enums.EUserTargets.Register, userInfo, data);
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
