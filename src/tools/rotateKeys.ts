import Log from './logger/index.js';
import Redis from '../connections/redis/index.js';
import { getKeys as generateKeys } from '../oidc/utils.js';

class RotateKeys {
  private readonly _redis: Redis;

  constructor() {
    this._redis = new Redis();
  }

  private get redis(): Redis {
    return this._redis;
  }

  init(): void {
    Log.warn('Keys rotation', process.env);
    this.rotateKeys()
      .then(() => {
        this.close();
      })
      .catch((err) => {
        Log.error('Keys rotation', 'Could not rotate keys', err);
      });
  }

  private close(): void {
    this.redis.close().catch((err) => {
      Log.error('Keys rotation', 'Could not close redis connection', err);
    });
  }

  private async rotateKeys(): Promise<void> {
    await this.redis.init();

    const keys = await generateKeys(2);
    await this.redis.addPrivateKeys(keys);
    Log.debug('Keys rotation', 'Added new keys', keys);
  }
}

new RotateKeys().init();
