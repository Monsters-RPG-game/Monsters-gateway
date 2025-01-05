import Log from 'simpleLogger';
import Mongo from '../connections/mongo/index.js';
import KeysController from '../modules/keys/index.js';

class RotateKeys {
  private readonly _mongo: Mongo;
  private readonly _keys: KeysController;

  constructor() {
    this._mongo = new Mongo();
    this._keys = new KeysController();
  }

  private get mongo(): Mongo {
    return this._mongo;
  }

  private get keys(): KeysController {
    return this._keys;
  }

  init(): void {
    this.configLogger();
    Log.log('Keys rotation', 'Started');

    this.rotateKeys()
      .then(() => {
        Log.log('Keys rotation', 'Added new keys');
        this.close();
      })
      .catch((err) => {
        Log.error('Keys rotation', 'Could not rotate keys', err);
        this.close();
      });
  }

  private close(): void {
    try {
      this.mongo.disconnect();
    } catch (err) {
      Log.error('Keys rotation', 'Got error while closing connection to mongoDB', (err as Error).message);
    }
  }

  private async rotateKeys(): Promise<void> {
    await this.mongo.init();
    await this.keys.createKeys();
  }

  private configLogger(): void {
    Log.setPrefix('monsters');
  }
}

new RotateKeys().init();
