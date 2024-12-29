import type ReqController from '../connections/router/reqController.js';
import type * as enums from '../enums/index.js';
import type { IProfileEntity } from '../modules/profile/entity.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { Locals } from 'express';
import type { Session } from 'express-session';
import type { JWTPayload } from 'jose';

export interface IUserLocals extends Locals {
  reqId: string;
  reqController: ReqController;
  userId: string | undefined;
  tempId: string;
  initializedProfile: boolean;
  type: enums.EUserTypes;
  profile: IProfileEntity | undefined;
  user: IUserEntity | undefined;

  [key: string]: unknown;
}

export interface IUserServerTokens {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export interface IUserSession extends Session {
  userId?: string;
  nonce?: string;
  client?: string;
  verifier?: string;
  logout?: boolean;
}

export interface IUserBrokerInfo {
  userId: string | undefined;
  tempId: string | undefined;
}

export interface ICachedUser {
  account: IUserEntity | undefined;
  profile: IProfileEntity | undefined;
}

export interface IUserAuthorizationsData extends JWTPayload {
  login: string;
}
