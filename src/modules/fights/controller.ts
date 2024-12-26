import * as enums from '../../enums/index.js';
import AttackController from './subModules/attack/index.js';
import DebugFightsController from './subModules/debug/index.js';
import GetFightsController from './subModules/getFight/index.js';
import GetFightLogsController from './subModules/getLogs/index.js';
import LeaveFightController from './subModules/leave/index.js';
import UseSkillController from './subModules/useSkill/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class FightsController extends AbstractController<enums.EControllers.Fights> {
  /**
   * Register fights controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EFightActions.Attack, new AttackController());
    this.register(enums.EFightActions.Debug, new DebugFightsController());
    this.register(enums.EFightActions.GetFights, new GetFightsController());
    this.register(enums.EFightActions.GetLogs, new GetFightLogsController());
    this.register(enums.EFightActions.Leave, new LeaveFightController());
    this.register(enums.EFightActions.UseSkill, new UseSkillController());
  }
}
