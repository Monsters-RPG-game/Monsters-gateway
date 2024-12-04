import { describe, expect, it } from '@jest/globals';
import State from '../../../src/state.js';
import fakeUsers from '../../utils/fakeData/users.json'
import fakeProfiles from '../../utils/fakeData/profiles.json'
import { IUserEntity } from '../../../src/modules/user/entity.js';
import { IProfileEntity } from '../../../src/modules/profile/entity.js';
import { FakeRedis } from '../../utils/mocks/index.js';
import type { ICachedUser } from '../../../src/types/index.js';

describe('Redis', () => {
  const fakeUser: IUserEntity = fakeUsers.data[0] as IUserEntity;
  const fakeProfile: IProfileEntity = fakeProfiles.data[0] as IProfileEntity;

  describe('Should pass', () => {
    it(`No data in redis`, async () => {
      const user = await State.redis.getCachedUser(fakeUser._id);
      expect(user).toEqual(undefined);
    });

    it(`Name in redis`, async () => {
      await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
      const user = (await State.redis.getCachedUser(fakeUser._id)) as ICachedUser;
      expect(user.account).toEqual(fakeUser);

      await (State.redis as FakeRedis).removeCachedUser(fakeUser._id);
    });
  });
});
