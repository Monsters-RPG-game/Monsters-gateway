import * as enums from '../../enums/index.js';
import GetStatsController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class StatsController extends AbstractController<enums.EControllers.Stats> {
  /**
   * Register stats controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EStatsActions.Get, new GetStatsController());
  }
}
