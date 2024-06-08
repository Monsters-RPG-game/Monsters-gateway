import { beforeAll, describe, expect, it } from '@jest/globals';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import supertest from 'supertest';
import * as enums from '../../../src/enums';
import fakeData from '../../fakeData.json';
// import type { IProfileEntity } from '../../types';
import * as types from '../../types';
import { IFakeOidcKey } from '../../types';
import State from '../../../src/state';
import { FakeBroker } from '../../utils/mocks';
import { fakeAccessToken } from '../../utils';
import { IAddExpDto } from '../../../src/structure/modules/profile/addExp/types';

describe('Profiles - addExp', () => {
  const fakeBroker = State.broker as FakeBroker;
  let accessToken: IFakeOidcKey;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeProfile = fakeData.profiles[0] as types.IProfileEntity;

  const payload: IAddExpDto = {
    profileId: fakeProfile._id,
    exp: 10,
  };
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
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

      const body = res.body;
      console.log('=====', body);
      expect(res.status).toEqual(200);
    });
  });
});
