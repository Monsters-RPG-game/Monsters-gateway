import * as enums from '../../enums/index.js';
import GetPartyController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class PartyController extends AbstractController<enums.EControllers.Party> {
  /**
   * Register party controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EPartyActions.Get, new GetPartyController());
  }
}
