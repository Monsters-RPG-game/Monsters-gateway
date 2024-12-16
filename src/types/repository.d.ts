import type * as enums from '../enums/index.js';
import type AddClient from '../modules/clients/repository/add/dto.js';
import type { IClientEntity } from '../modules/clients/repository/types.js';
import type AddKey from '../modules/keys/repository/add/dto.js';
import type { IKeyEntity } from '../modules/keys/repository/types.js';
import type AddOidcClient from '../modules/oidcClient/repository/add/dto.js';
import type { IOidcClientEntity } from '../modules/oidcClient/repository/types.js';
import type AddToken from '../modules/tokens/repository/add/dto.js';
import type { ITokenEntity } from '../modules/tokens/repository/types.js';
import type { IUserEntity } from '../modules/user/entity.js';
import type AddUser from '../modules/user/repository/add/dto.js';

export interface IRepositoryGetData {
  [enums.ELocalModules.Client]: IClientEntity | null;
  [enums.ELocalModules.OidcClient]: IOidcClientEntity | null;
  [enums.ELocalModules.User]: IUserEntity | null;
  [enums.ELocalModules.Token]: ITokenEntity | null;
  [enums.ELocalModules.Key]: IKeyEntity | null;
}

export interface IRepositoryAddData {
  [enums.ELocalModules.Client]: AddClient;
  [enums.ELocalModules.OidcClient]: AddOidcClient;
  [enums.ELocalModules.User]: AddUser;
  [enums.ELocalModules.Token]: AddToken;
  [enums.ELocalModules.Key]: AddKey;
}

export interface IGenericRepository<T extends enums.ELocalModules> {
  get(id: string): Promise<IRepositoryGetData[T]>;
  add(data: IRepositoryAddData[T]): Promise<string>;
}
