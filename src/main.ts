import Log from 'simpleLogger';
import Broker from './connections/broker/index.js';
import Mongo from './connections/mongo/index.js';
import Redis from './connections/redis/index.js';
import Router from './connections/router/index.js';
import WebsocketServer from './connections/websocket/index.js';
import Liveness from './tools/liveness.js';
import State from './tools/state.js';
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
    this.configLogger();
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app', message, stack);

      this.close();
    });
  }

  @Log.decorateLog('Server', 'App closed')
  private close(): void {
    this.liveness?.close();
    State.kill();
  }

  private configLogger(): void {
    Log.setPrefix('monsters');
  }

  private async handleInit(): Promise<void> {
    const router = new Router();
    const broker = new Broker();
    const socket = new WebsocketServer();
    const mongo = new Mongo();
    const redis = new Redis();

    State.router = router;
    State.broker = broker;
    State.socket = socket;
    State.redis = redis;
    State.mongo = mongo;

    await broker.init();
    await redis.init();
    await mongo.init();
    await State.initKeys();
    router.init();
    socket.init();
    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();

    this.listenForSignals();
  }

  private listenForSignals(): void {
    process.on('SIGTERM', () => {
      Log.log('Server', 'Received signal SIGTERM. Gracefully closing');
      this.close();
    });
    process.on('SIGINT', () => {
      Log.log('Server', 'Received signal SIGINT. Gracefully closing');
      this.close();
    });
  }
}

const app = new App();
app.init();
