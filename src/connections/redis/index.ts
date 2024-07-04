import { createClient } from 'redis';
import Rooster from './rooster.js';
import * as enums from '../../enums/index.js';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import type { IProfileEntity } from '../../structure/modules/profile/entity.js';
import type { ISkillsEntityDetailed } from '../../structure/modules/skills/getDetailed/types.js';
import type { IUserEntity } from '../../structure/modules/user/entity.js';
import type { ICachedUser, IFullError } from '../../types/index.js';
import type { JWK } from 'jose';
import type { RedisClientType } from 'redis';

export default class Redis {
  private readonly _rooster: Rooster;
  private _client: RedisClientType | undefined;

  constructor() {
    this._rooster = new Rooster();
  }

  private get client(): RedisClientType | undefined {
    return this._client;
  }

  private get rooster(): Rooster {
    return this._rooster;
  }

  async init(): Promise<void> {
    this.initClient();
    this.rooster.init(this.client!);
    this.listen();
    await this.client!.connect();
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.quit();
    }
  }

  async getAccountToRemove(target: string): Promise<string | undefined> {
    return this.rooster.getFromHash({ target: `${enums.ERedisTargets.AccountToRemove}:${target}`, value: target });
  }

  async getCachedSkills(id: string): Promise<ISkillsEntityDetailed | undefined> {
    const cachedSkills = await this.rooster.getFromHash({
      target: `${enums.ERedisTargets.CachedSkills}:${id}`,
      value: id,
    });
    return cachedSkills ? (JSON.parse(cachedSkills) as ISkillsEntityDetailed) : undefined;
  }

  async getCachedUser(id: string): Promise<ICachedUser | undefined> {
    const cachedUser = await this.rooster.getFromHash({ target: `${enums.ERedisTargets.CachedUser}:${id}`, value: id });
    return cachedUser ? (JSON.parse(cachedUser) as ICachedUser) : undefined;
  }

  async getOidcHash(target: string, id: string): Promise<string | undefined> {
    return this.rooster.getFromHash({ target, value: id });
  }
  /**
   * Get private keys used to generate user keys
   */
  async getPrivateKeys(): Promise<JWK[]> {
    const target = `${enums.ERedisTargets.PrivateKeys}`;
    const indexes = await this.rooster.getKeys(`${target}:*`);
    const keys = await Promise.all(
      indexes.map((i) => {
        return this.rooster.getAllFromList(i);
      }),
    );
    return keys && keys.length > 0 ? keys.flat().map((k) => JSON.parse(k as string) as JWK) : [];
  }
  async setExpirationDate(target: enums.ERedisTargets | string, ttl: number): Promise<void> {
    await this.rooster.setExpirationDate(target, ttl);
  }

  async removeOidcElement(target: string): Promise<void> {
    return this.rooster.removeElement(target);
  }

  async removeCachedUser(target: string): Promise<void> {
    return this.rooster.removeFromHash(`${enums.ERedisTargets.CachedUser}:${target}`, target);
  }

  async addAccountToRemove(target: string): Promise<void> {
    await this.rooster.addToHash(`${enums.ERedisTargets.AccountToRemove}:${target}`, target, target);
    return this.setExpirationDate(`${enums.ERedisTargets.AccountToRemove}:${target}`, 60 * 60);
  }

  async removeAccountToRemove(target: string): Promise<void> {
    return this.rooster.removeFromHash(`${enums.ERedisTargets.AccountToRemove}:${target}`, target);
  }

  async addOidc(target: string, id: string, value: unknown): Promise<void> {
    await this.rooster.addToHash(target, id, typeof value === 'string' ? value : JSON.stringify(value));
  }

  async addGrantId(target: string, id: string, value: string): Promise<void> {
    await this.rooster.addToHash(target, id, value);
  }

  async updateCachedUser(
    id: string,
    value: {
      profile?: Partial<IProfileEntity>;
      account?: Partial<IUserEntity>;
    },
  ): Promise<void> {
    const cachedUser = await this.rooster.getFromHash({ target: `${enums.ERedisTargets.CachedUser}:${id}`, value: id });
    if (!cachedUser) return;
    const parsedUser = JSON.parse(cachedUser) as {
      account: IUserEntity;
      profile: IProfileEntity;
    };
    await this.addCachedUser({
      ...parsedUser,
      account: value.account ? { ...parsedUser.account, ...value.account } : parsedUser.account,
      profile: value.profile ? { ...parsedUser.profile, ...value.profile } : parsedUser.profile,
    });
  }

  async addCachedUser(user: { account: IUserEntity; profile: IProfileEntity }): Promise<void> {
    await this.rooster.addToHash(
      `${enums.ERedisTargets.CachedUser}:${user.account._id}`,
      user.account._id,
      JSON.stringify(user),
    );
    await this.rooster.setExpirationDate(`${enums.ERedisTargets.CachedUser}:${user.account._id}`, 60000);
  }

  async addCachedSkills(skills: ISkillsEntityDetailed, userId: string): Promise<void> {
    await this.rooster.addToHash(`${enums.ERedisTargets.CachedSkills}:${userId}`, userId, JSON.stringify(skills));
    await this.rooster.setExpirationDate(`${enums.ERedisTargets.CachedSkills}:${userId}`, 60000);
  }

  async addPrivateKeys(keys: JWK[]): Promise<void> {
    const indexes = await this.rooster.getKeys(`${enums.ERedisTargets.PrivateKeys}:*`);
    const highestNumber =
      indexes.length === 0
        ? '1'
        : (
            indexes
              .map((i) => Number(i.split(':')[1]))
              .sort((a, b) => {
                if (a > b) return 1;
                if (b > 1) return -1;
                return 0;
              })[indexes.length - 1]! + 1
          ).toString();
    const liveKey = `${enums.ERedisTargets.PrivateKeys}:${highestNumber}`;

    await this.rooster.addToList(
      liveKey,
      keys.map((k) => JSON.stringify(k)),
    );
    await this.rooster.setExpirationDate(`${liveKey}`, 60 * 60 * 24 * 7);
  }

  private initClient(): void {
    this._client = createClient({
      url: getConfig().redisURI,
    });
  }

  private listen(): void {
    this.client!.on('error', (err) => {
      const error = err as IFullError;
      return Log.error('Redis', error.message, error.stack);
    });

    this.client!.on('ready', () => Log.log('Redis', 'Redis connected'));
    this.client!.on('end', () => Log.log('Redis', 'Redis disconnected'));
    this.client!.on('reconnecting', () => Log.log('Redis', 'Redis error. Reconnecting'));
  }
}
