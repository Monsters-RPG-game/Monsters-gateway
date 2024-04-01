import type * as enums from '../enums/index.js';
import type { IProfileEntity } from '../structure/modules/profile/entity.d.js';
import type { IUserEntity } from '../structure/modules/user/entity.d.js';
import type ReqHandler from '../structure/reqHandler.js';
import type { Locals } from 'express';
import type session from 'express-session';

export interface IUsersTokens extends Locals {
  reqHandler: ReqHandler;
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

export interface IUserSession extends session.Session, Partial<session.SessionData> {
  userId: string;
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
