import { createClient } from 'redis';
import Log from 'simpleLogger';
import Repository from './repository.js';
import * as enums from '../../enums/index.js';
import getConfig from '../../tools/configLoader.js';
import type { IProfileEntity } from '../../modules/profile/entity.js';
import type { ISkillsEntityDetailed } from '../../modules/skills/getDetailed/types.js';
import type { IUserEntity } from '../../modules/user/entity.js';
import type { ICachedUser, IFullError, IUserSession, ISessionTokenData } from '../../types/index.js';
import type { ClientRateLimitInfo } from 'express-rate-limit';
import type { JWK } from 'jose';
import type { RedisClientType } from 'redis';

export default class Redis {
  private readonly _repository: Repository;

  private _client: RedisClientType | undefined;
  constructor() {
    this._repository = new Repository();
  }

  private get client(): RedisClientType | undefined {
    return this._client;
  }

  private get repository(): Repository {
    return this._repository;
  }

  async getAccountToRemove(target: string): Promise<string | undefined> {
    return this.repository.getFromHash({ target: `${enums.ERedisTargets.AccountToRemove}:${target}`, value: target });
  }

  async getCachedSkills(id: string): Promise<ISkillsEntityDetailed | undefined> {
    const cachedSkills = await this.repository.getFromHash({
      target: `${enums.ERedisTargets.CachedSkills}:${id}`,
      value: id,
    });
    return cachedSkills ? (JSON.parse(cachedSkills) as ISkillsEntityDetailed) : undefined;
  }

  async getCachedUser(id: string): Promise<ICachedUser | undefined> {
    const cachedUser = await this.repository.getFromHash({
      target: `${enums.ERedisTargets.CachedUser}:${id}`,
      value: id,
    });
    return cachedUser ? (JSON.parse(cachedUser) as ICachedUser) : undefined;
  }

  async getOidcHash(target: string, id: string): Promise<string | undefined> {
    return this.repository.getFromHash({ target, value: id });
  }

  /**
   * Get private keys used to generate user keys.
   * @returns Saved private keys.
   */
  async getPrivateKeys(): Promise<JWK[]> {
    const target = `${enums.ERedisTargets.PrivateKeys}`;
    const indexes = await this.repository.getKeys(`${target}:*`);
    const keys = await Promise.all(
      indexes.map((i) => {
        return this.repository.getAllFromList(i);
      }),
    );
    return keys && keys.length > 0 ? keys.flat().map((k) => JSON.parse(k as string) as JWK) : [];
  }

  async getSession(session: string): Promise<IUserSession | null> {
    const data = await this.repository.getElement(`session:${session}`);

    return data ? (JSON.parse(data) as IUserSession) : null;
  }

  async getSessionToken(id: string): Promise<ISessionTokenData | null> {
    const data = await this.repository.getElement(`sessionToken:${id}`);

    return data ? (JSON.parse(data) as ISessionTokenData) : null;
  }

  async getSessionTokenId(userId: string): Promise<string | null> {
    return this.repository.getElement(`sessionTokensId:${userId}`);
  }

  async getSessionTokenTTL(sessionId: string): Promise<number> {
    return this.repository.getTTl(`sessionToken:${sessionId}`);
  }

  async getUserToken(userId: string): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const accessToken = await this.repository.getElement(`accessToken:${userId}`);
    const refreshToken = await this.repository.getElement(`refreshToken:${userId}`);

    return { accessToken, refreshToken };
  }

  async setExpirationDate(target: enums.ERedisTargets | string, ttl: number): Promise<void> {
    await this.repository.setExpirationDate(target, ttl);
  }

  async setRateLimit(ip: string): Promise<ClientRateLimitInfo> {
    let data: ClientRateLimitInfo | string | null = await this.repository.getElement(`rateLimit:${ip}`);

    if (!data) {
      data = { totalHits: 1, resetTime: new Date(Date.now() + 60 * 1000) };
    } else {
      const parsed = JSON.parse(data) as ClientRateLimitInfo & { resetTime: string | Date };
      if (parsed.totalHits > 30) return { ...parsed, resetTime: new Date(parsed.resetTime) };
      data = { totalHits: (parsed.totalHits += 1), resetTime: new Date(Date.now() + 60 * 1000) };
    }

    await this.repository.addElement(`rateLimit:${ip}`, JSON.stringify(data));
    await this.setExpirationDate(`rateLimit:${ip}`, enums.ETTL.ExpressRateLimiter);

    return data;
  }

  async removeOidcElement(target: string): Promise<void> {
    return this.repository.removeElement(target);
  }

  async removeCachedUser(target: string): Promise<void> {
    return this.repository.removeFromHash(`${enums.ERedisTargets.CachedUser}:${target}`, target);
  }

  async addAccountToRemove(target: string): Promise<void> {
    await this.repository.addToHash(`${enums.ERedisTargets.AccountToRemove}:${target}`, target, target);
    return this.setExpirationDate(`${enums.ERedisTargets.AccountToRemove}:${target}`, 60 * 60);
  }

  async removeAccountToRemove(target: string): Promise<void> {
    return this.repository.removeFromHash(`${enums.ERedisTargets.AccountToRemove}:${target}`, target);
  }

  async addOidc(target: string, id: string, value: unknown): Promise<void> {
    await this.repository.addToHash(target, id, typeof value === 'string' ? value : JSON.stringify(value));
  }

  async addGrantId(target: string, id: string, value: string): Promise<void> {
    await this.repository.addToHash(target, id, value);
  }

  async updateCachedUser(
    id: string,
    value: {
      profile?: Partial<IProfileEntity>;
      account?: Partial<IUserEntity>;
    },
  ): Promise<void> {
    const cachedUser = await this.repository.getFromHash({
      target: `${enums.ERedisTargets.CachedUser}:${id}`,
      value: id,
    });
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
    await this.repository.addToHash(
      `${enums.ERedisTargets.CachedUser}:${user.account._id}`,
      user.account._id,
      JSON.stringify(user),
    );
    await this.repository.setExpirationDate(`${enums.ERedisTargets.CachedUser}:${user.account._id}`, 60000);
  }

  async addCachedSkills(skills: ISkillsEntityDetailed, userId: string): Promise<void> {
    await this.repository.addToHash(`${enums.ERedisTargets.CachedSkills}:${userId}`, userId, JSON.stringify(skills));
    await this.repository.setExpirationDate(`${enums.ERedisTargets.CachedSkills}:${userId}`, 60000);
  }

  async addPrivateKeys(keys: JWK[]): Promise<void> {
    const indexes = await this.repository.getKeys(`${enums.ERedisTargets.PrivateKeys}:*`);
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

    await this.repository.addToList(
      liveKey,
      keys.map((k) => JSON.stringify(k)),
    );
    await this.repository.setExpirationDate(`${liveKey}`, 60 * 60 * 24 * 7);
  }

  async addSessionToken(id: string, sessionData: ISessionTokenData, eol: Date): Promise<void> {
    await this.repository.addElement(`sessionToken:${id}`, JSON.stringify(sessionData));
    await this.repository.setExpirationDate(`sessionToken:${id}`, Math.floor((eol.getTime() - Date.now()) / 1000));
    await this.repository.addElement(`sessionTokensId:${sessionData.sub}`, id);
    await this.repository.setExpirationDate(
      `sessionTokensId:${sessionData.sub}`,
      Math.floor((eol.getTime() - Date.now()) / 1000),
    );
  }

  async addAccessToken(userId: string, token: string): Promise<void> {
    await this.repository.addElement(`accessToken:${userId}`, token);
    await this.repository.setExpirationDate(`accessToken:${userId}`, enums.ETTL.UserAccessToken);
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    await this.repository.addElement(`refreshToken:${userId}`, token);
    await this.repository.setExpirationDate(`refreshToken:${userId}`, enums.ETTL.UserRefreshToken);
  }

  async removeAccessToken(userId: string): Promise<void> {
    await this.repository.removeElement(`accessToken:${userId}`);
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.repository.removeElement(`refreshToken:${userId}`);
  }

  async removeSessionToken(sessionId: string): Promise<void> {
    await this.repository.removeElement(`sessionToken:${sessionId}`);
  }

  async removeSessionTokenId(userId: string): Promise<void> {
    await this.repository.removeElement(`sessionTokensId:${userId}`);
  }

  async removeUserTokens(userId: string): Promise<void> {
    await this.removeAccessToken(userId);
    await this.removeRefreshToken(userId);
    const sessionTokenId = await this.getSessionTokenId(userId);
    if (sessionTokenId) {
      await this.removeSessionToken(sessionTokenId);
      await this.removeSessionTokenId(userId);
    }
  }

  async addUserTokens(userId: string, accessToken: string, refreshToken: string): Promise<void> {
    await this.addAccessToken(userId, accessToken);
    await this.addRefreshToken(userId, refreshToken);
  }

  async decrementRateLimit(ip: string): Promise<void> {
    let data: ClientRateLimitInfo | string | null = await this.repository.getElement(`rateLimit:${ip}`);
    if (!data) return;

    const parsed = JSON.parse(data) as ClientRateLimitInfo;
    data = {
      totalHits: parsed.totalHits > 2 ? (parsed.totalHits -= 1) : 1,
      resetTime: new Date(Date.now() + 60 * 1000),
    };

    await this.repository.addElement(`rateLimit:${ip}`, JSON.stringify(data));
    await this.setExpirationDate(`rateLimit:${ip}`, enums.ETTL.ExpressRateLimiter);
  }

  async init(): Promise<void> {
    this.initClient();
    this.repository.init(this.client!);
    this.listen();
    await this.client!.connect();
  }

  close(): void {
    if (this.client) {
      this.client.quit().catch((err) => {
        Log.error('Redis', 'Cannot close connection', (err as Error).message);
      });
    }
  }

  async addSession(session: string, sessionData: IUserSession): Promise<void> {
    await this.repository.addElement(`session:${session}`, JSON.stringify(sessionData));
    await this.repository.setExpirationDate(`session:${session}`, enums.ETTL.ExpressSession);
  }

  async removeSession(session: string): Promise<void> {
    return this.repository.removeElement(`session:${session}`);
  }

  async removeRateLimit(ip: string): Promise<void> {
    return this.repository.removeElement(`rateLimit:${ip}`);
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
