import Log from './tools/logger/index.js';
import type Broker from './connections/broker/index.js';
import type Mysql from './connections/mysql/index.js';
import type Redis from './connections/redis/index.js';
import type WebsocketServer from './connections/websocket/index.js';
import type Router from './structure/index.js';
import type { IState } from './types/index.d.js';
import type { JSONWebKeySet } from 'jose';
import type Provider from 'oidc-provider';

class State implements IState {
  private _broker: Broker | null = null;
  private _socket: WebsocketServer | null = null;
  private _redis: Redis | null = null;
  private _router: Router | null = null;
  private _mysql: Mysql | null = null;
  private _keys: JSONWebKeySet = { keys: [] };
  private _provider: Provider | null = null;

  get broker(): Broker {
    return this._broker as Broker;
  }

  set broker(value: Broker) {
    this._broker = value;
  }

  get mysql(): Mysql {
    return this._mysql as Mysql;
  }

  set mysql(value: Mysql) {
    this._mysql = value;
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

  get provider(): Provider {
    return this._provider as Provider;
  }

  set provider(value: Provider) {
    this._provider = value;
  }

  async kill(): Promise<void> {
    await this.redis.close();
    this.router.close();
    this.broker.close();
    this.socket.close();
    this.mysql.close();
    Log.log('Server', 'Server closed');
  }
}

export default new State();
