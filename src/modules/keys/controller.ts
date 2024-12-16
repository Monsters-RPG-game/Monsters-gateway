import { generateKeyPair, exportJWK } from 'jose';
import Log from 'simpleLogger';
import type { JWK } from 'jose';

export default class Keys {
  private static async getKey(): Promise<JWK> {
    const { privateKey } = await generateKeyPair('RSA', { modulusLength: 2048 });
    return exportJWK(privateKey);
  }

  static async generateKeys(amount: number): Promise<JWK[]> {
    const keys: JWK[] = [];
    const actions: (() => Promise<void>)[] = [];

    for (let i = 0; i < amount; i++) {
      actions.push(async () => {
        keys.push(await Keys.getKey());
      });
    }

    await Promise.allSettled(actions.map(async (a) => a())).catch((err) => {
      Log.error('Keys', 'Cannot create key', (err as Error).message);
    });

    return keys;
  }
}
