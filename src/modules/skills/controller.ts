import * as enums from '../../enums/index.js';
import AddStatsController from './subModules/add/index.js';
import GetStatsController from './subModules/get/index.js';
import GetDetailedController from './subModules/getDetailed/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class SkillsController extends AbstractController<enums.EControllers.Skills> {
  /**
   * Register skills controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.ESkillsActions.Get, new GetStatsController());
    this.register(enums.ESkillsActions.Add, new AddStatsController());
    this.register(enums.ESkillsActions.GetDetailed, new GetDetailedController());
  }
}
