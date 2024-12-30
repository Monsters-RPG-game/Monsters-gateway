import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { EControllers, EUserActions } from '../../../../../enums/controllers.js';
import type express from 'express';

export default class UserRouter extends AbstractRouter<EControllers.Users, EUserActions.RefreshToken> {
  async execute(
    req: express.Request,
  ): Promise<{ sessionToken: string | undefined; refreshToken: string; accessToken: string } | string> {
    return this.controller.execute(req);
  }
}
