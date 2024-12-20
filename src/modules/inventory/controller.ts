import * as enums from '../../enums/index.js';
import ReqController from '../../tools/abstractions/reqController.js';
import type { IInventoryEntity } from './entity.js';
import type { IUserBrokerInfo } from '../../types/index.js';
import type InventoryDropDto from './subModules/drop/dto.js';
import type InventoryUseDto from './subModules/use/dto.js';

export default class InventoryController extends ReqController {
  async use(data: InventoryUseDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Inventory, enums.EItemsTargets.Use, userData, data);
  }

  async drop(data: InventoryDropDto, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(this.service, enums.EUserMainTargets.Inventory, enums.EItemsTargets.Drop, userData, data);
  }

  async get(userData: IUserBrokerInfo): Promise<{
    type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
    payload: IInventoryEntity;
  }> {
    return (await this.sendReq(
      this.service,
      enums.EUserMainTargets.Message,
      enums.EMessagesTargets.GetUnread,
      userData,
    )) as {
      type: enums.EMessageTypes.Credentials | enums.EMessageTypes.Send;
      payload: IInventoryEntity;
    };
  }
}
