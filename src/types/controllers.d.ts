import type * as enums from '../enums/index.js';
import type HealthController from '../modules/health/controller.js';
import type GetHealthSubController from '../modules/health/subModules/get/index.js';
import type MessagesController from '../modules/messages/controller.js';
import type GetMessageSubController from '../modules/messages/subModules/get/index.js';
import type GetUnreadMessageSubController from '../modules/messages/subModules/getUnread/index.js';
import type ReadMessageSubController from '../modules/messages/subModules/read/index.js';
import type SendMessageSubController from '../modules/messages/subModules/send/index.js';
import type ProfileController from '../modules/profile/controller.js';
import type GetProfileSubController from '../modules/profile/subModules/get/index.js';
import type UsersController from '../modules/users/controller.js';
import type DebugUserSubController from '../modules/users/subModules/debug/index.js';

export type IControllerActions =
  | enums.EUserActions
  | enums.EProfileActions
  | enums.EMessageActions
  | enums.EHealthActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IMessageControllers extends IControllerActionsMap {
  [enums.EMessageActions.Get]: GetMessageSubController;
  [enums.EMessageActions.GetUnread]: GetUnreadMessageSubController;
  [enums.EMessageActions.Send]: SendMessageSubController;
  [enums.EMessageActions.Read]: ReadMessageSubController;
}

export interface IProfileControllers extends IControllerActionsMap {
  [enums.EProfileActions.Get]: GetProfileSubController;
}

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.Debug]: DebugUserSubController;
}

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthSubController;
}

export interface IController {
  [enums.EControllers.Health]: HealthController;
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Profile]: ProfileController;
  [enums.EControllers.Messages]: MessagesController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Profile]: IProfileControllers;
  [enums.EControllers.Messages]: IMessageControllers;
  [enums.EControllers.Health]: IHealthControllers;
}
