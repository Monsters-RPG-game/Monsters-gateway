import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { ICharacterEntity } from './entity.js';
import type AddCharacterDto from './subModules/add/dto.js';
import type GetCharacterDto from './subModules/get/dto.js';
import type RemoveCharacterDto from './subModules/remove/dto.js';
import type UpdateCharacterDto from './subModules/update/dto.js';
import type * as types from '../../types/index.js';

export default class Npc extends ReqController {
  async get(
    data: GetCharacterDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ICharacterEntity[];
  }> {
    return (await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.GetNpc, userInfo, data)) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ICharacterEntity[];
    };
  }

  async add(data: AddCharacterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.AddNpc, userInfo, data);
  }

  async update(data: UpdateCharacterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.UpdateNpc, userInfo, data);
  }

  async remove(data: RemoveCharacterDto, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Npc, enums.ENpcTargets.RemoveNpc, userInfo, data);
  }
}
