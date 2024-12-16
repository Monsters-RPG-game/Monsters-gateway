import { createClient } from 'redis';
import Log from 'simpleLogger';
import RedisKeys from './keys.js';
import Repository from './repository.js';
import * as enums from '../../enums/index.js';
import getConfig from '../../tools/configLoader.js';
import type { IProfileEntity } from '../../modules/profile/entity.js';
import type { ISkillsEntityDetailed } from '../../modules/skills/getDetailed/types.js';
import type { IUserEntity } from '../../modules/user/entity.js';
import type { ICachedUser, IFullError, IUserSession, ISessionTokenData } from '../../types/index.js';
import type { ClientRateLimitInfo } from 'express-rate-limit';
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

  async getCachedSkills(id: string): Promise<ISkillsEntityDetailed | undefined> {
    const cachedSkills = await this.repository.getFromHash({
      target: `${enums.ERedisTargets.CachedSkills}:${id}`,
      value: id,
    });
    return cachedSkills ? (JSON.parse(cachedSkills) as ISkillsEntityDetailed) : undefined;
  }

  async getCachedUser(id: string): Promise<ICachedUser | undefined> {
    const key = RedisKeys.userCache(id);

    const cachedUser = await this.repository.getFromHash({
      target: key,
      value: id,
    });
    return cachedUser ? (JSON.parse(cachedUser) as ICachedUser) : undefined;
  }

  async getSession(session: string): Promise<IUserSession | null> {
    const key = RedisKeys.session(session);

    const data = await this.repository.getElement(key);

    return data ? (JSON.parse(data) as IUserSession) : null;
  }

  async getSessionToken(id: string): Promise<ISessionTokenData | null> {
    const key = RedisKeys.sessionToken(id);

    const data = await this.repository.getElement(key);

    return data ? (JSON.parse(data) as ISessionTokenData) : null;
  }

  async getSessionTokenId(userId: string): Promise<string | null> {
    const key = RedisKeys.sessionTokenId(userId);

    return this.repository.getElement(key);
  }

  async getSessionTokenTTL(sessionId: string): Promise<number> {
    const key = RedisKeys.sessionToken(sessionId);

    return this.repository.getTTl(key);
  }

  async getUserToken(userId: string): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    Log.debug('Redis', `Getting tokens for user ${userId}`);
    const accessKey = RedisKeys.accessToken(userId);
    const refreshKey = RedisKeys.refreshToken(userId);

    const accessToken = await this.repository.getElement(accessKey);
    const refreshToken = await this.repository.getElement(refreshKey);

    return { accessToken, refreshToken };
  }

  async setExpirationDate(target: enums.ERedisTargets | string, ttl: number): Promise<void> {
    await this.repository.setExpirationDate(target, ttl);
  }

  async setRateLimit(ip: string): Promise<ClientRateLimitInfo> {
    const key = RedisKeys.rateLimit(ip);
    let data: ClientRateLimitInfo | string | null = await this.repository.getElement(key);

    if (!data) {
      data = { totalHits: 1, resetTime: new Date(Date.now() + 60 * 1000) };
    } else {
      const parsed = JSON.parse(data) as ClientRateLimitInfo & { resetTime: string | Date };
      if (parsed.totalHits > 30) return { ...parsed, resetTime: new Date(parsed.resetTime) };
      data = { totalHits: (parsed.totalHits += 1), resetTime: new Date(Date.now() + 60 * 1000) };
    }

    await this.repository.addElement(key, JSON.stringify(data));
    await this.setExpirationDate(key, enums.ETTL.ExpressRateLimiter);

    return data;
  }

  async addCachedSkills(skills: ISkillsEntityDetailed, userId: string): Promise<void> {
    await this.repository.addToHash(`${enums.ERedisTargets.CachedSkills}:${userId}`, userId, JSON.stringify(skills));
    await this.repository.setExpirationDate(`${enums.ERedisTargets.CachedSkills}:${userId}`, 60000);
  }

  async addSessionToken(id: string, sessionData: ISessionTokenData, eol: Date): Promise<void> {
    const sessionTokenKey = RedisKeys.sessionToken(id);
    const sessionTokenIdKey = RedisKeys.sessionTokenId(sessionData.sub!);

    await this.repository.addElement(sessionTokenKey, JSON.stringify(sessionData));
    await this.repository.setExpirationDate(sessionTokenKey, Math.floor((eol.getTime() - Date.now()) / 1000));
    await this.repository.addElement(sessionTokenIdKey, id);
    await this.repository.setExpirationDate(sessionTokenIdKey, Math.floor((eol.getTime() - Date.now()) / 1000));
  }

  async addAccessToken(userId: string, token: string): Promise<void> {
    const key = RedisKeys.accessToken(userId);

    await this.repository.addElement(key, token);
    await this.repository.setExpirationDate(key, enums.ETTL.UserAccessToken);
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    const key = RedisKeys.refreshToken(userId);

    await this.repository.addElement(key, token);
    await this.repository.setExpirationDate(key, enums.ETTL.UserRefreshToken);
  }

  async removeAccessToken(userId: string): Promise<void> {
    const key = RedisKeys.accessToken(userId);

    await this.repository.removeElement(key);
  }

  async removeRefreshToken(userId: string): Promise<void> {
    const key = RedisKeys.refreshToken(userId);

    await this.repository.removeElement(key);
  }

  async removeSessionToken(sessionId: string): Promise<void> {
    const key = RedisKeys.sessionToken(sessionId);

    await this.repository.removeElement(key);
  }

  async removeSessionTokenId(userId: string): Promise<void> {
    const key = RedisKeys.sessionTokenId(userId);

    await this.repository.removeElement(key);
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

  async removeCachedUser(target: string): Promise<void> {
    const key = RedisKeys.userCache(target);

    return this.repository.removeFromHash(key, target);
  }

  async updateCachedUser(
    id: string,
    value: {
      profile?: Partial<IProfileEntity>;
      account?: Partial<IUserEntity>;
    },
  ): Promise<void> {
    const key = RedisKeys.userCache(id);

    const cachedUser = await this.repository.getFromHash({
      target: key,
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
    const key = RedisKeys.userCache(user.account._id);

    await this.repository.addToHash(key, user.account._id, JSON.stringify(user));
    await this.repository.setExpirationDate(key, 60000);
  }

  async addUserTokens(userId: string, accessToken: string, refreshToken: string): Promise<void> {
    await this.addAccessToken(userId, accessToken);
    await this.addRefreshToken(userId, refreshToken);
  }

  async decrementRateLimit(ip: string): Promise<void> {
    const key = RedisKeys.rateLimit(ip);
    let data: ClientRateLimitInfo | string | null = await this.repository.getElement(key);
    if (!data) return;

    const parsed = JSON.parse(data) as ClientRateLimitInfo;
    data = {
      totalHits: parsed.totalHits > 2 ? (parsed.totalHits -= 1) : 1,
      resetTime: new Date(Date.now() + 60 * 1000),
    };

    await this.repository.addElement(key, JSON.stringify(data));
    await this.setExpirationDate(key, enums.ETTL.ExpressRateLimiter);
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
    const key = RedisKeys.session(session);

    await this.repository.addElement(key, JSON.stringify(sessionData));
    await this.repository.setExpirationDate(key, enums.ETTL.ExpressSession);
  }

  async removeSession(session: string): Promise<void> {
    const key = RedisKeys.session(session);

    return this.repository.removeElement(key);
  }

  async removeRateLimit(ip: string): Promise<void> {
    const key = RedisKeys.rateLimit(ip);

    return this.repository.removeElement(key);
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
