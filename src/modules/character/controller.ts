import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstracts/reqController.js';
import State from '../../tools/state.js';
import type ChangeCharacterStatusDto from './changeState/dto.js';
import type { IUserBrokerInfo } from '../../types/index.js';
import type { IProfileEntity } from '../profile/entity.js';

export default class CharacterState extends ReqController {
  async changeState(data: ChangeCharacterStatusDto, userInfo: IUserBrokerInfo): Promise<Partial<IProfileEntity>> {
    await this.sendReq(
      this.service,
      enums.EUserMainTargets.CharacterState,
      enums.ECharacterStateTargets.ChangeState,
      userInfo,
      data,
    );
    await State.redis.updateCachedUser(userInfo.userId as string, { profile: data });

    return data;
  }
}
