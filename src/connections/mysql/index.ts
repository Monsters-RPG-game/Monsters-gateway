import knex from 'knex';
import getConfig from '../../tools/configLoader.js';
import type { ClientMetadata } from 'oidc-provider';

export default class Mysql {
  private _knex: knex.Knex | undefined;

  private get knex(): knex.Knex {
    return this._knex as knex.Knex;
  }

  private set knex(value: knex.Knex) {
    this._knex = value;
  }

  init(): void {
    this.knex = knex({
      client: 'mysql2',
      connection: {
        host: getConfig().mysql.host,
        user: getConfig().mysql.user,
        password: getConfig().mysql.password,
        database: getConfig().mysql.db,
        port: getConfig().mysql.port,
      },
      pool: {
        min: 10,
        max: 20,
      },
    });
  }

  close(): void {
    if (this.knex) {
      this.knex.destroy().catch(() => {
        // Ignored
      });
    }
  }

  async getOidcClients(): Promise<ClientMetadata[]> {
    return this.knex('oidcClients').select();
  }
}
