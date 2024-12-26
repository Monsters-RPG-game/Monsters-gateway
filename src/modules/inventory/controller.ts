import * as enums from '../../enums/index.js';
import DropItemController from './subModules/drop/index.js';
import GetItemController from './subModules/get/index.js';
import UseItemController from './subModules/use/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class ItemsController extends AbstractController<enums.EControllers.Inventory> {
  /**
   * Register items controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.EItemActions.Get, new GetItemController());
    this.register(enums.EItemActions.Drop, new DropItemController());
    this.register(enums.EItemActions.Use, new UseItemController());
  }
}
