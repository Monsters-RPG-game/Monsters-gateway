import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IActionEntity, IFight, IFightLogsEntity } from './entity.js';
import type AttackDto from './subModules/attack/dto.js';
import type CreateFightDto from './subModules/debug/dto.js';
import type { IGetFightDto } from './subModules/getFight/types.js';
import type { IGetFightLogsDto } from './subModules/getLogs/types.js';
import type UseSkillDto from './subModules/useSkill/dto.js';
import type * as types from '../../types/index.js';

export default class Fight extends ReqController {
  async getFights(
    data: IGetFightDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IFight[];
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Fight,
      enums.EFightsTargets.GetFights,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IFight[];
    };
  }
  async getLogs(
    data: IGetFightLogsDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IFightLogsEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Fight,
      enums.EFightsTargets.GetLogs,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IFightLogsEntity;
    };
  }
  async createFight(
    data: CreateFightDto, // Temporary change
    userInfo: types.IUserBrokerInfo,
  ): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Fight, enums.EFightsTargets.CreateFight, userInfo, data);
  }

  async leaveFight(data: null, userInfo: types.IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Fight, enums.EFightsTargets.Leave, userInfo, data);
  }

  async attack(
    data: AttackDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: { logs: IActionEntity[]; status: enums.EFightStatus; currentHp: number };
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Fight,
      enums.EFightsTargets.Attack,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: { logs: IActionEntity[]; status: enums.EFightStatus; currentHp: number };
    };
  }

  async useSkill(
    data: UseSkillDto,
    userInfo: types.IUserBrokerInfo,
  ): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: { logs: IActionEntity[]; status: enums.EFightStatus };
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Fight,
      enums.EFightsTargets.UseSkill,
      userInfo,
      data,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: { logs: IActionEntity[]; status: enums.EFightStatus };
    };
  }
}
