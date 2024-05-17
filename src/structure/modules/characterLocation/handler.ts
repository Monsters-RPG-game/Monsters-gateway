import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type ChangeCharacterLocationDto from './change/dto.js';
import type CreateCharacterLocationDto from './create/dto';
import type GetCharacterLocationDto from './get/dto.js';
import type { ICharacterLocationEntity } from './get/types.js';
import type { IUserBrokerInfo } from '../../../types/index.js';

export default class CharacterLocation extends ReqHandler {
  async change(
    data: ChangeCharacterLocationDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: { attack: boolean };
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.CharacterLocation,
      enums.ECharacterLocationTargets.Change,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: { attack: boolean };
    };
  }

  async create(
    data: CreateCharacterLocationDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: { id: string };
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.CharacterLocation,
      enums.ECharacterLocationTargets.Create,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: { id: string };
    };
  }

  async get(
    data: GetCharacterLocationDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ICharacterLocationEntity | null;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.CharacterLocation,
      enums.ECharacterLocationTargets.Get,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ICharacterLocationEntity | null;
    };
  }
}
