import * as enums from '../../enums/index.js';
import AddNpcController from './subModules/add/index.js';
import GetNpcController from './subModules/get/index.js';
import RemoveNpcController from './subModules/remove/index.js';
import UpdateNpcController from './subModules/update/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class NpcController extends AbstractController<enums.EControllers.Npc> {
  /**
   * Register npc controllers.
   * @returns Void.
   */
  protected init(): void {
    this.register(enums.ENpcActions.Get, new GetNpcController());
    this.register(enums.ENpcActions.Add, new AddNpcController());
    this.register(enums.ENpcActions.Remove, new RemoveNpcController());
    this.register(enums.ENpcActions.Update, new UpdateNpcController());
  }
}
