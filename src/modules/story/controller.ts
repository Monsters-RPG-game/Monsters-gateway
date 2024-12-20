import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { INarratorStoryEntity, INpcStoryEntity } from './entity.js';
import type GetIntentResponseDto from './subModules/getByIntent/dto.js';
import type GetByStageNarratorStoryDto from './subModules/getByStage/dto.js';
import type GetNarratorStoryDto from './subModules/getNarratorStory/dto.js';
import type GetNpcStoryDto from './subModules/getNpcStory/dto.js';
import type { IChapter, ILine } from './types.js';
import type { IUserBrokerInfo } from '../../types/index.js';

export default class Story extends ReqController {
  async getByStage(
    data: GetByStageNarratorStoryDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IChapter & { _id: string };
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.NarratorStory,
      enums.ENarratorStoryTargets.GetByStageNarratorStory,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IChapter & { _id: string };
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
  async getNarratorStory(
    data: GetNarratorStoryDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: INarratorStoryEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.NarratorStory,
      enums.ENarratorStoryTargets.GetNarratorStory,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: INarratorStoryEntity;
    };
  }
  async getNpcStory(
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
}
