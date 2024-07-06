import { beforeAll, describe, expect, it } from '@jest/globals';
import { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import fakeData from '../../fakeData.json';
import * as types from '../../types/index.js';
import State from '../../../src/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import type { IAddExpDto } from '../../../src/structure/modules/profile/addExp/types.js';
import type { ISkillsEntityDetailed } from '../../../src/structure/modules/skills/getDetailed/types.js';

describe('Profiles - addExp', () => {
  const fakeBroker = State.broker as FakeBroker;
  let accessToken: types.IFakeOidcKey;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeSkills = fakeData.skills[0] as ISkillsEntityDetailed;
  const fakeProfile = fakeData.profiles[0] as types.IProfileEntity;

  const payload: IAddExpDto = {
    profileId: fakeProfile._id,
    exp: 10,
  };
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
    await State.redis.addCachedSkills(fakeSkills,fakeUser._id);
  });

  describe('Should pass', () => {
    it(`AddExp`, async () => {
      const target = [{ state: fakeProfile }] as unknown as Record<string, unknown>;
      fakeBroker.actions.push({
        shouldFail: false,
        returns: {
          payload: target,
          target: enums.EMessageTypes.Send,
        },
      });
      const res = await supertest(app).post('/profile/exp').auth(accessToken.key, { type: 'bearer' }).send(payload);

      expect(res.status).toEqual(200);
    });
  });
});
