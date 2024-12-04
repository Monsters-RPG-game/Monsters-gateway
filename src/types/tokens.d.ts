export interface ITokenData {
  sub: string;
  iat: number;
  exp: number;
}

export interface ISessionTokenData extends ITokenData {
  id: string;
  ip: string[];
}
