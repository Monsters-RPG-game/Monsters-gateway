import { exportJWK, generateKeyPair } from 'jose';
import Log from 'simpleLogger';
import KeyModel from './model.js';
import AddKey from './repository/add.js';
import KeysRepository from './repository/index.js';
import type { JWK } from 'jose';

export default class Keys {
  private getKey = async (): Promise<JWK> => {
    const { privateKey } = await generateKeyPair('RS256', { modulusLength: 2048 });
    return exportJWK(privateKey);
  };

  async createKeys(): Promise<string> {
    Log.debug('Keys', 'Creating key');
    const repo = new KeysRepository(KeyModel);

    const key = await this.getKey();
    const newKey = new AddKey(key);
    Log.debug('Keys controller', 'Adding new key', newKey);
    return repo.add(newKey);
  }
}
