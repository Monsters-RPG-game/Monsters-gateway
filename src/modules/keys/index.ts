import { exportJWK, generateKeyPair } from 'jose';
import Log from 'simpleLogger';
import AddKey from './repository/add.js';
import KeysRepository from './repository/index.js';
import KeyModel from '../../connections/mongo/models/keys.js';
import type { JWK } from 'jose';

export default class Keys {
  private getKey = async (): Promise<JWK> => {
    const { privateKey } = await generateKeyPair('RSA', { modulusLength: 2048 });
    return exportJWK(privateKey);
  };

  async createKeys(): Promise<void> {
    Log.debug('Keys', 'Creating key');
    const repo = new KeysRepository(KeyModel);

    const key = await this.getKey();
    const newKey = new AddKey(key);
    await repo.add(newKey);
  }
}
