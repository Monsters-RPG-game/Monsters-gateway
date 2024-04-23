import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type AddCharacterDto from './add/dto';
import type { ICharacterEntity } from './entity';
import type GetCharacterDto from './get/dto.js';
import type RemoveCharacterDto from './remove/dto.js';
import type * as types from '../../../types/index.d.js';

export default class User extends ReqHandler {
  async get(
    data: GetCharacterDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ICharacterEntity;
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.GetNpc, userInfo, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ICharacterEntity;
    };
  }

  async add(data: AddCharacterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.AddNpc, userInfo, data);
  }

  async remove(data: RemoveCharacterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.RemoveNpc, userInfo, data);
  }
}
