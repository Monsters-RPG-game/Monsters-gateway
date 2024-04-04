import State from '../state.js';
import Log from '../tools/logger/index.js';
import type { Adapter as OidcAdapter, AdapterPayload } from 'oidc-provider';

export default class Adapter implements OidcAdapter {
  private readonly _name: string;
  private readonly _prefix: string = 'oidc:';

  constructor(name: string) {
    this._name = name;
  }

  private get prefix(): string {
    return this._prefix;
  }

  private get name(): string {
    return this._name;
  }

  async upsert(id: string, payload: AdapterPayload, expiresIn?: number): Promise<void> {
    if (this.name === 'Session') {
      await this.addUidIndex(payload.uid as string, payload.jti as string, payload.exp as number);
    }
    if (this.name === 'RefreshToken') {
      await this.addIndex(payload.accountId as string, id);
    }
    if (this.name === 'AccessToken') {
      await this.addIndex(payload.accountId as string, id);
    }

    await State.redis.addOidc(this.key(id), id, payload);
    if (expiresIn && expiresIn > 0) await State.redis.setExpirationDate(this.key(id), expiresIn);
  }

  async find(id: string): Promise<AdapterPayload | undefined> {
    const data = await State.redis.getOidcHash(this.key(id), id);

    if (!data || Object.keys(data).length === 0) {
      return undefined;
    }
    return JSON.parse(data) as AdapterPayload;
  }

  async destroy(id: string): Promise<void> {
    const key = await State.redis.getOidcHash(this.key(id), id);

    if (key) {
      const token = JSON.parse(key) as AdapterPayload;
      if (this.name === 'RefreshToken' || this.name === 'AccessToken') {
        await this.removeIndex(token.accountId as string);
        await State.redis.removeOidcElement(this.grantId(token.grantId as string));
      }
      await State.redis.removeOidcElement(this.key(id));
    }
  }

  async findByUserCode(_userCode: string): Promise<AdapterPayload | undefined> {
    Log.log('Find by user code', 'Not implemented');
    return new Promise((resolve) => resolve(undefined));
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined> {
    const key = this.uidIndexKey(uid);
    const data = await State.redis.getOidcHash(key, uid);
    if (!data) return undefined;
    return this.find(JSON.parse(data) as string);
  }

  async revokeByGrantId(_grantId: string): Promise<void> {
    Log.log('Find by uid', 'Not implemented');
    return new Promise((resolve) => resolve(undefined));
  }

  async consume(id: string): Promise<void> {
    await State.redis.addOidc(this.key(id), '', Math.floor(Date.now() / 1000));
  }

  private async addIndex(userId: string, tokenId: string): Promise<void> {
    const key = this.indexKey(userId);
    await State.redis.addOidc(key, this.name, tokenId);
    await State.redis.setExpirationDate(key, 14 * 24 * 60 * 60);
  }

  private async addUidIndex(uid: string, target: string, exp: number): Promise<void> {
    const key = this.uidIndexKey(uid);
    await State.redis.addOidc(key, uid, target);
    await State.redis.setExpirationDate(key, exp);
  }

  private async removeIndex(userId: string): Promise<void> {
    const key = this.indexKey(userId);
    await State.redis.removeOidcElement(key);
  }

  private key(id: string): string {
    return `${this.prefix}${this.name}:${id}`;
  }

  private indexKey(id: string): string {
    return `${this.prefix}OidcIndex:${id}`;
  }

  private uidIndexKey(id: string): string {
    return `${this.prefix}UidIndex:${id}`;
  }

  private grantId(grant: string): string {
    return `${this.prefix}GrantId:${grant}`;
  }
}
