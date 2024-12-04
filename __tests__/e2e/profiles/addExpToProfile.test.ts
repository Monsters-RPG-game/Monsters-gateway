import { beforeAll, afterEach, describe, expect, it } from '@jest/globals';
import { IUserEntity } from '../../../src/modules/user/entity.js';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import fakeUsers from '../../utils/fakeData/users.json'
import fakeProfiles from '../../utils/fakeData/profiles.json'
import fakeSkills from '../../utils/fakeData/skils.json';
import * as types from '../../types/index.js';
import State from '../../../src/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import type { IAddExpDto } from '../../../src/modules/profile/addExp/types.js';
import type { ISkillsEntityDetailed } from '../../../src/modules/skills/getDetailed/types.js';

describe('Profiles - addExp', () => {
  const fakeBroker = State.broker as FakeBroker;
  let accessToken: types.IFakeOidcKey;
  const fakeUser = fakeUsers.data[0] as IUserEntity;
  const fakeSkill = fakeSkills.data[0] as ISkillsEntityDetailed;
  const fakeProfile = fakeProfiles.data[0] as types.IProfileEntity;

  const payload: IAddExpDto = {
    profileId: fakeProfile._id,
    exp: 10,
  };
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
    await State.redis.addCachedSkills(fakeSkill, fakeUser._id);
  });

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should pass', () => {
    it(`AddExp`, async () => {
      const target = [{ state: fakeProfile }] as unknown as Record<string, unknown>;
      fakeBroker.addAction({
        shouldFail: false,
        returns: {
          payload: target,
          target: enums.EMessageTypes.Send,
        },
      }, enums.EProfileTargets.AddExp)

      const res = await supertest(app).post('/profile/exp').auth(accessToken.key, { type: 'bearer' }).send(payload);

      expect(res.status).toEqual(200);
    });
  });
});
