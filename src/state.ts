import Log from 'simpleLogger';
import Keys from './modules/keys/index.js';
import type Broker from './connections/broker/index.js';
import type Redis from './connections/redis/index.js';
import type Router from './connections/router/index.js';
import type WebsocketServer from './connections/websocket/index.js';
import type { IState } from './types/index.js';
import type { JSONWebKeySet } from 'jose';

class State implements IState {
  private _broker: Broker | null = null;
  private _socket: WebsocketServer | null = null;
  private _redis: Redis | null = null;
  private _router: Router | null = null;
  private _keys: JSONWebKeySet = { keys: [] };
  private _keysValidation: NodeJS.Timeout | null = null;

  get broker(): Broker {
    return this._broker as Broker;
  }

  set broker(value: Broker) {
    this._broker = value;
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

  get keysValidation(): NodeJS.Timeout {
    return this._keysValidation as NodeJS.Timeout;
  }

  set keysValidation(value: NodeJS.Timeout) {
    this._keysValidation = value;
  }

  kill(): void {
    this.redis.close();
    this.router.close();
    this.broker.close();
    this.socket.close();
    clearInterval(this.keysValidation);
    Log.log('Server', 'Server closed');
  }

  async initKeys(): Promise<void> {
    let keys = await this.redis.getPrivateKeys();

    if (!keys || keys.length === 0) {
      keys = await Keys.generateKeys(2);
      await this.redis.addPrivateKeys(keys);
    }
    this.keys = { keys };

    this.keysValidation = setTimeout(
      async () => {
        Log.log('Keys', 'Validating private keys');
        await this.initKeys();
      },
      1000 * 60 * 60 * 24,
    );
  }
}

export default new State();
