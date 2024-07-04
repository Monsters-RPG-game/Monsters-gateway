import Redis from '../../../src/connections/redis/index.js';
import type { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import type { IProfileEntity } from '../../../src/structure/modules/profile/entity.js';
import type { ICachedUser } from '../../../src/types/index.js';
import * as enums from '../../../src/enums/index.js';
import type { AdapterPayload } from 'oidc-provider';
import type { ISkillsEntityDetailed } from '../../../src/structure/modules/skills/getDetailed/types.js';

export default class FakeRedis extends Redis {
  private _cachedUsers: ICachedUser[] = [];
  private _skills: ISkillsEntityDetailed[] = [];
  private _accountsToRemove: string[] = [];
  private _accessTokens: AdapterPayload[] = [];

  constructor() {
    super();
  }

  get accessTokens(): AdapterPayload[] {
    return this._accessTokens;
  }

  set accessTokens(value: AdapterPayload[]) {
    this._accessTokens = value;
  }

  get accountsToRemove(): string[] {
    return this._accountsToRemove;
  }

  set accountsToRemove(value: string[]) {
    this._accountsToRemove = value;
  }

  get cachedUsers(): ICachedUser[] {
    return this._cachedUsers;
  }

  set cachedUsers(value: ICachedUser[]) {
    this._cachedUsers = value;
  }

  public get skills(): ISkillsEntityDetailed[] {
    return this._skills;
  }

  override async addCachedUser(user: { account: IUserEntity; profile: IProfileEntity }): Promise<void> {
    return new Promise((resolve) => {
      this.cachedUsers.push(user);
      resolve();
    });
  }

  override async addCachedSkills(skills: ISkillsEntityDetailed, _userId: string): Promise<void> {
    return new Promise((resolve) => {
      this.skills.push(skills);
      resolve();
    });
  }

  override async getCachedSkills(id: string): Promise<ISkillsEntityDetailed | undefined> {
    console.log('REDIS SKILLS',this.skills)
    console.log('REDI ID ',id)
    return new Promise((resolve) => {
      resolve(this.skills.find((t) => t.owner === id));
    });
  }
  override async removeCachedUser(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.cachedUsers = this.cachedUsers.filter((u) => u.account?._id !== id);
      resolve();
    });
  }

  override async removeOidcElement(_target: string): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  override async addAccountToRemove(target: string): Promise<void> {
    return new Promise((resolve) => {
      this.accountsToRemove.push(target);
      resolve();
    });
  }

  override async removeAccountToRemove(target: string): Promise<void> {
    return new Promise((resolve) => {
      this.accountsToRemove = this.accountsToRemove.filter((t) => t !== target);
      resolve();
    });
  }

  override async addOidc(_target: string, _id: string, value: unknown): Promise<void> {
    return new Promise((resolve) => {
      this.accessTokens.push(value as AdapterPayload);
      resolve();
    });
  }

  override async getOidcHash(_target: string, id: string): Promise<string | undefined> {
    return new Promise((resolve) => {
      const data = this.accessTokens.find((t) => t.jti === id);
      resolve(data ? JSON.stringify(data) : undefined);
    });
  }

  override async getAccountToRemove(target: string): Promise<string | undefined> {
    return new Promise((resolve) => {
      resolve(this.accountsToRemove.find((t) => t === target));
    });
  }

  override async setExpirationDate(_target: enums.ERedisTargets | string, _ttl: number): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  override async getCachedUser(id: string): Promise<ICachedUser | undefined> {
    return new Promise((resolve) => {
      resolve(this.cachedUsers.find((u) => u.account?._id === id));
    });
  }
}
