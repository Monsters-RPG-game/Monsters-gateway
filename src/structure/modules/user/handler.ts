import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type DebugGetAllUsersDto from './debug/dto.js';
import type { IUserEntity } from './entity.d.js';
import type * as types from '../../../types/index.d.js';
import type LoginDto from '../../modules/oidc/interaction/dto.js';
import type UserDetailsDto from '../../modules/user/details/dto.js';
import type RegisterDto from '../../modules/user/register/dto.js';
import type RemoveUserDto from '../../modules/user/remove/dto.js';

export default class User extends ReqHandler {
  async delete(data: RemoveUserDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.User, enums.EUserTargets.Remove, userInfo, data);
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

  async login(
    data: LoginDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: types.IUserCredentials;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.User,
      enums.EUserTargets.Login,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: types.IUserCredentials;
    };
  }
}
