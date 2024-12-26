import * as enums from '../../enums/index.js';
import AddProfileController from './subModules/add/index.js';
import AddExpController from './subModules/addExp/index.js';
import GetProfileController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class ProfileController extends AbstractController<enums.EControllers.Profile> {
  /**
   * Register profile controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EProfileActions.Get, new GetProfileController());
    this.register(enums.EProfileActions.Add, new AddProfileController());
    this.register(enums.EProfileActions.AddExp, new AddExpController());
  }
}
