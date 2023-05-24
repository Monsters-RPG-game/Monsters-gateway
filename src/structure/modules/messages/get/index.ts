import InventoryDropDto from './dto';
import * as enums from '../../../../enums';
import { EConnectionType, EServices } from '../../../../enums';
import RouterFactory from '../../../../tools/abstracts/router';
import State from '../../../../tools/state';
import type { ILocalUser } from '../../../../types';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  get(req: express.Request, res: ILocalUser): void {
    const data = new InventoryDropDto(Number(req.query.page));

    State.broker.sendLocally(
      enums.EUserMainTargets.Messages,
      enums.EMessageTargets.Get,
      { target: EConnectionType.Api, res },
      data,
      EServices.Users,
    );
  }
}
