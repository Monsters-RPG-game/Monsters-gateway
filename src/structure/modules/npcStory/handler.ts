import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { INpcStoryEntity, ILine } from './entity.js';
import type { IUserBrokerInfo } from '../../../types/index.js';
import type GetNpcStoryDto from '../../modules/npcStory/get/dto.js';
import type GetIntentResponseDto from '../../modules/npcStory/getIntent/dto.js';

export default class Story extends ReqHandler {
  async get(
    data: GetNpcStoryDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: INpcStoryEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.NpcStory,
      enums.ENpcStoryTargets.GetNpcStory,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: INpcStoryEntity;
    };
  }
  async getIntent(
    data: GetIntentResponseDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: ILine;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.NpcStory,
      enums.ENpcStoryTargets.GetNpcIntent,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: ILine;
    };
  }
}
