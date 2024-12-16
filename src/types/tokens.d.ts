import type { JWTPayload } from 'jose';

export interface IIntrospection {
  active: boolean;
  sub: string;
  client_id: string;
  exp: number;
  iat: number;
  iss: string;
  scope: string;
}

export interface ISessionTokenData extends JWTPayload {
  id: string;
  ip: string[];
}
