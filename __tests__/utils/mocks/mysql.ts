import Mysql from '../../../src/connections/mysql/index.js';
import { ClientMetadata } from 'oidc-provider';

export default class FakeMysql extends Mysql {
  override async getOidcClients(): Promise<ClientMetadata[]> {
    return new Promise((resolve) =>
      resolve([
        {
          id: 2,
          client_id: 'oidcClient',
          client_secret: 'secret',
          grant_types: ['authorization_code', 'refresh_token'],
          redirect_uris: ['http://localhost:3005/login'],
          scope: 'openid',
        },
      ]),
    );
  }
}
