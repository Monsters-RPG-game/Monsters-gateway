import type Redis from './redis';
import type WebsocketServer from './websocket';
import type Broker from '../broker';
import type Router from '../structure';
import type { IState } from '../types';

class State implements IState {
  private _broker: Broker | null = null;
  private _socket: WebsocketServer | null = null;
  private _redis: Redis | null = null;
  private _router: Router | null = null;

  get broker(): Broker {
    return this._broker!;
  }

  set broker(value: Broker) {
    this._broker = value;
  }

  get socket(): WebsocketServer {
    return this._socket!;
  }

  set socket(value: WebsocketServer) {
    this._socket = value;
  }

  get redis(): Redis {
    return this._redis!;
  }

  set redis(value: Redis) {
    this._redis = value;
  }

  get router(): Router {
    return this._router!;
  }

  set router(value: Router) {
    this._router = value;
  }
}

export default new State();
