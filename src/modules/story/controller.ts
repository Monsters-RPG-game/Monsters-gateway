import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import type { INpcStoryEntity, INarratorEntity } from './entity.js';
import type GetByStageNarratorStoryDto from './getByStage/dto.js';
import type GetIntentResponseDto from './getIntent/dto.js';
import type GetNarratorStoryDto from './getNarratoryStory/dto.js';
import type GetNpcStoryDto from './getNpcStory/dto.js';
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
  async getNarratoryStory(
    data: GetNarratorStoryDto,
    userData: IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: INarratorEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.NarratorStory,
      enums.ENarratorStoryTargets.GetNarratorStory,
      userData,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: INarratorEntity;
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
