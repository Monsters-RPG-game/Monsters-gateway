import mongoose from 'mongoose';
import Log from 'simpleLogger';
import getConfig from '../tools/configLoader.js';
import type { Connection, ConnectOptions } from 'mongoose';

export default class MongoConnection {
  private _migrationClient: Connection | undefined;

  private get migrationClient(): Connection | undefined {
    return this._migrationClient;
  }

  private set migrationClient(value: Connection | undefined) {
    this._migrationClient = value;
  }

  async init(): Promise<Connection> {
    await this.startServer();
    return this.createMigrationClient();
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    if (this.migrationClient) await this.migrationClient.close();
  }

  private async startServer(): Promise<void> {
    await mongoose.connect(getConfig().mongoURL, {
      dbName: 'Gateway',
    } as ConnectOptions);
    Log.log('Mongo', 'Started server');
  }

  private createMigrationClient(): Connection {
    return mongoose.createConnection(getConfig().mongoURL, {
      dbName: 'Migrations',
    } as ConnectOptions);
  }
}
