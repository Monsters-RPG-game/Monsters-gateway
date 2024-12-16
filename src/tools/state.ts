import Log from 'simpleLogger';
import { MissingKeys } from '../errors/index.js';
import KeyRepository from '../modules/keys/repository/index.js';
import KeyModel from '../modules/keys/repository/model.js';
import type Broker from '../connections/broker/index.js';
import type Mongo from '../connections/mongo/index.js';
import type Redis from '../connections/redis/index.js';
import type Router from '../connections/router/index.js';
import type WebsocketServer from '../connections/websocket/index.js';
import type { IState } from '../types/index.js';
import type { JSONWebKeySet } from 'jose';

class State implements IState {
  private _broker: Broker | null = null;
  private _mongo: Mongo | null = null;
  private _socket: WebsocketServer | null = null;
  private _redis: Redis | null = null;
  private _router: Router | null = null;
  private _keys: JSONWebKeySet = { keys: [] };

  get broker(): Broker {
    return this._broker as Broker;
  }

  set broker(value: Broker) {
    this._broker = value;
  }

  get mongo(): Mongo {
    return this._mongo as Mongo;
  }

  set mongo(value: Mongo) {
    this._mongo = value;
  }

  get socket(): WebsocketServer {
    return this._socket as WebsocketServer;
  }

  set socket(value: WebsocketServer) {
    this._socket = value;
  }

  get redis(): Redis {
    return this._redis as Redis;
  }

  set redis(value: Redis) {
    this._redis = value;
  }

  get router(): Router {
    return this._router as Router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get keys(): JSONWebKeySet {
    return this._keys;
  }

  set keys(value: JSONWebKeySet) {
    this._keys = value;
  }

  kill(): void {
    this.redis.close();
    this.router.close();
    this.broker.close();
    this.socket.close();
    Log.log('Server', 'Server closed');
  }

  async initKeys(): Promise<void> {
    const keys = await new KeyRepository(KeyModel).getAll();

    if (!keys || keys.length === 0) {
      Log.error(
        'Keys',
        'Missing JWK keys for token validation. If you are running in production, prevalidation script for generating tokens died. Make sure that your database is running and script has access to it. Otherwise, you probably forgot to add keys',
      );
      throw new MissingKeys();
    }
    this.keys = { keys };
  }
}

export default new State();
