import State from '../../src/state.js';
import FakeBroker from './mocks/broker.js';
import FakeRedis from './mocks/redis.js';
import Router from '../../src/connections/router/index.js';
import SocketServer from './mocks/websocket.js';

export default class Utils {
  constructor() {
    State.broker = new FakeBroker();
    State.router = new Router();
    State.socket = new SocketServer();
    State.redis = new FakeRedis();
  }

  connect(): void {
    State.socket.init();
    State.router.init();
  }

  async close(): Promise<void> {
    State.router.close();
    State.socket.close();
  }
}
