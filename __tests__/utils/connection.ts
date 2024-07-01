import State from '../../src/state.js';
import FakeBroker from './mocks/broker.js';
import FakeRedis from './mocks/redis.js';
import Router from '../../src/structure/index.js';
import SocketServer from './mocks/websocket.js';
import FakeMysql from './mocks/mysql.js';

export default class Utils {
  constructor() {
    State.broker = new FakeBroker();
    State.router = new Router();
    State.socket = new SocketServer();
    State.redis = new FakeRedis();
    State.mysql = new FakeMysql();
  }

  async connect(): Promise<void> {
    State.socket.init();
    await State.router.init();
  }

  async close(): Promise<void> {
    State.router.close();
    State.socket.close();
  }
}
