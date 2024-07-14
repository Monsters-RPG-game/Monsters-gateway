import { beforeAll, afterEach, describe, expect, it } from '@jest/globals';
import { IFullError } from '../../../src/types/index.js';
import supertest from 'supertest';
import fakeData from '../../fakeData.json';
import type { IProfileEntity } from '../../types/index.js';
import * as types from '../../types/index.js';
import { IFakeOidcKey } from '../../types/index.js';
import * as enums from '../../../src/enums/index.js';
import { EUserTypes } from '../../../src/enums/index.js';
import State from '../../../src/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import * as errors from '../../../src/errors/index.js';
import { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import { fakeAccessToken } from '../../utils/index.js';
import type { ISkillsEntityDetailed } from '../../../src/structure/modules/skills/getDetailed/types.js';

describe('Profiles = get', () => {
  const fakeBroker = State.broker as FakeBroker;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeSkills = fakeData.skills[0] as ISkillsEntityDetailed;
  const getProfile: types.IUserDetailsDto = {
    name: fakeUser.login,
  };
  let accessToken: IFakeOidcKey;
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);

    await State.redis.addCachedSkills(fakeSkills, fakeUser._id);
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`Missing name`, async () => {
        const target = new errors.MissingArgError('name') as unknown as Record<string, unknown>;

        fakeBroker.addAction({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Get)

        const res = await supertest(app)
          .get('/profile')
          .query({ name: undefined })
          .auth(accessToken.key, { type: 'bearer' })
          .send();
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual(target.message);
      });
    });
  });

  describe('Should pass', () => {
    it(`Got profile`, async () => {
      fakeBroker.addAction({
        shouldFail: false,
        returns: {
          payload: [
            {
              _id: fakeUser._id,
              login: fakeUser.login,
              verified: false,
              type: EUserTypes.User,
            },
          ],
          target: enums.EMessageTypes.Send,
        },
      }, enums.EUserTargets.GetName)

      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: { _id: fakeUser._id }, target: enums.EMessageTypes.Send },
      }, enums.EProfileTargets.Get)

      const res = await supertest(app)
        .get('/profile')
        .query({ name: getProfile.name })
        .auth(accessToken.key, { type: 'bearer' })
        .send();
      const body = res.body as { data: IProfileEntity };

      expect(body.data._id).not.toBeUndefined();
    });
  });
});
