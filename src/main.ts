import Broker from './connections/broker/index.js';
import Mysql from './connections/mysql/index.js';
import Redis from './connections/redis/index.js';
import WebsocketServer from './connections/websocket/index.js';
import State from './state.js';
import Router from './structure/index.js';
import Liveness from './tools/liveness.js';
import Log from './tools/logger/index.js';
import type { IFullError } from './types/index.js';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(value: Liveness | undefined) {
    this._liveness = value;
  }

  init(): void {
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app');
      Log.error('Server', message, stack);
      Log.error('Server', JSON.stringify(err));

      this.liveness?.close();
      return State.kill().catch((error) =>
        Log.error('Server', "Couldn't kill server", (error as Error).message, (error as Error).stack),
      );
    });
  }

  private async handleInit(): Promise<void> {
    const router = new Router();
    const broker = new Broker();
    const socket = new WebsocketServer();
    const redis = new Redis();
    const mysql = new Mysql();

    State.router = router;
    State.broker = broker;
    State.socket = socket;
    State.mysql = mysql;
    State.redis = redis;

    mysql.init();
    await broker.init();
    await redis.init();
    await State.initKeys();
    await router.init();
    socket.init();
    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();
  }
}

const app = new App();
app.init();
