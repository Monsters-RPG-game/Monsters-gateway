import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { EControllers, EUserActions } from '../../../../../enums/controllers.js';
import type express from 'express';

export default class UserRouter extends AbstractRouter<EControllers.Users, EUserActions.ValidateToken> {
  async execute(req: express.Request): Promise<{ login: string; tokenTTL: string; realTokenTTL: string }> {
    return this.controller.execute(req);
  }
}
