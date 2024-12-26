import * as enums from '../../enums/index.js';
import AddStatsController from './subModules/add/index.js';
import GetStatsController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class SingleSkillController extends AbstractController<enums.EControllers.SingleSkill> {
  /**
   * Register single skill controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.ESingleSkillActions.Get, new GetStatsController());
    this.register(enums.ESingleSkillActions.Add, new AddStatsController());
  }
}
