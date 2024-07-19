import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type { INarratorEntity } from './entity.js';
import type { IChapter } from './types.js';
import type { IUserBrokerInfo } from '../../../types/index.js';
import type GetNarratorStoryDto from '../../modules/narratorStory/get/dto.js';
import type GetByStageNarratorStoryDto from '../../modules/narratorStory/getByStage/dto.js';

export default class NarratorStory extends ReqHandler {
  async get(
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
}
