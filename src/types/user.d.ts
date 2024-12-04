import type ReqController from '../connections/router/reqController.js';
import type * as enums from '../enums/index.js';
import type { IProfileEntity } from '../modules/profile/entity.js';
import type { IUserEntity } from '../modules/user/entity.js';
import type { Locals } from 'express';
import type { Session } from 'express-session';

export interface IUsersTokens extends Locals {
  reqController: ReqController;
  userId: string | undefined;
  tempId: string;
  initializedProfile: boolean;
  type: enums.EUserTypes;
  profile: IProfileEntity | undefined;
  user: IUserEntity | undefined;

  [key: string]: unknown;
}

export interface IUserCredentials {
  id: string;
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

export interface IAccessToken {
  iat: number;
  exp: number;
  accountId: string;
  grantId: string;
  gty: string;
  sessionUid: string;
  clientId: string;
  scope: string;
  kind: string;
  jti: string;
}
