import Provider from 'oidc-provider';
import oidcClaims from './claims.js';
import { getKeys as generateKeys } from './utils.js';
import State from '../state.js';
import getConfig from '../tools/configLoader.js';
import Log from '../tools/logger/index.js';
import type { ILoginKeys } from '../types/index.d.js';
import type { JWK } from 'jose';
import type { ClientMetadata, Configuration } from 'oidc-provider';

export default class Oidc {
  async init(): Promise<Provider> {
    const claims = await this.initClaims();
    return this.initProvider(claims);
  }

  private initProvider(claims: Configuration): Provider {
    const errors = [
      'authorization.error',
      'grant.error',
      'certificates.error',
      'discovery.error',
      'introspection.error',
      'revocation.error',
      'userinfo.error',
      'check_session.error',
      'backchannel.error',
      'server_error',
    ];
    const provider = new Provider(getConfig().myAddress.replace(/:\d+/u, ''), claims);
    provider.proxy = true;

    for (const e of errors) {
      provider.on(e, (...err: Record<string, unknown>[]) => {
        Log.error(e, err);
      });
    }
    return provider;
  }

  private async initClaims(): Promise<Configuration> {
    let keys = await State.mysql.getKeys();

    if (!keys || keys.length === 0) {
      const newKeys = await generateKeys(10);
      const now = new Date();
      let keyId = 1;
      keys = newKeys.map((k) => {
        return {
          id: keyId++,
          key: k,
          expiration: now,
        };
      }) as ILoginKeys[];
      await State.mysql.addKeys(keys);
    }

    State.keys = { keys: keys.map((e) => (typeof e.key === 'string' ? (JSON.parse(e.key) as JWK) : e.key)) };
    const clients = await State.mysql.getOidcClients();
    // #TODO This is stupid and temporary fix. Mysql package had huge vulnerability, which was fixed in updated package. For some reason, knex does not work with updated package and returns broken list of elements
    return oidcClaims(State.keys, JSON.parse(JSON.stringify(clients)) as ClientMetadata[]);
  }
}
