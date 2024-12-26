import Log from 'simpleLogger';
import * as enums from '../enums/index.js';
import FightsController from '../modules/fights/controller.js';
import HealthController from '../modules/health/controller.js';
import InventoryController from '../modules/inventory/controller.js';
import MessagesController from '../modules/messages/controller.js';
import NpcController from '../modules/npc/controller.js';
import PartyController from '../modules/party/controller.js';
import ProfileController from '../modules/profile/controller.js';
import SingleSkillController from '../modules/singleSkill/controller.js';
import SkillsController from '../modules/skills/controller.js';
import StatsController from '../modules/stats/controller.js';
import StoryController from '../modules/story/controller.js';
import UsersController from '../modules/users/controller.js';
import type * as types from '../types/index.js';

/**
 * Wrapper for in app modules.
 */
export default class Bootstrap {
  private _controllers: Map<enums.EControllers, types.IController[enums.EControllers]> = new Map();

  private get controllers(): Map<enums.EControllers, types.IController[enums.EControllers]> {
    return this._controllers;
  }

  /**
   * Register new module.
   * @param target Module target.
   * @param value Module value.
   */
  register<T extends enums.EControllers>(target: T, value: types.IController[T]): void {
    this.controllers.set(target, value);
  }

  /**
   * Resolve new module.
   * @param target Module target.
   * @returns Registered module.
   */
  resolve<T extends enums.EControllers>(target: T): types.IController[T] | undefined {
    return this.controllers.get(target) as types.IController[T] | undefined;
  }

  /**
   * Initialize wrapper.
   */
  init(): void {
    Log.debug('Bootstrap', 'Initializing');

    this.register(enums.EControllers.Users, new UsersController());
    this.register(enums.EControllers.Fights, new FightsController());
    this.register(enums.EControllers.Story, new StoryController());
    this.register(enums.EControllers.Stats, new StatsController());
    this.register(enums.EControllers.Skills, new SkillsController());
    this.register(enums.EControllers.SingleSkill, new SingleSkillController());
    this.register(enums.EControllers.Profile, new ProfileController());
    this.register(enums.EControllers.Party, new PartyController());
    this.register(enums.EControllers.Npc, new NpcController());
    this.register(enums.EControllers.Inventory, new InventoryController());
    this.register(enums.EControllers.Health, new HealthController());
    this.register(enums.EControllers.Messages, new MessagesController());
  }

  /**
   * Close wrapper.
   * This function is here, to clean registered controllers, if necessary.
   */
  close(): void {
    Log.log('Bootstrap', 'Closing');
  }
}
