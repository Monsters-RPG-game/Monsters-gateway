import { beforeAll, describe, expect, it, afterEach } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import fakeData from '../../fakeData.json';
import State from '../../../src/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { EMessageTypes } from '../../../src/enums/index.js';
import { IRemoveAccountDto } from '../../../src/structure/modules/user/remove/types.js';
import { IFakeOidcKey, IProfileEntity } from '../../types/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import { IFullError } from '../../../src/types/index.js';

describe('Remove', () => {
  const { app } = State.router;
  const fakeBroker = State.broker as FakeBroker;

  const fakeUser = fakeData.users[0]!;
  const fakeUserEntity: IUserEntity = {
    _id: fakeUser._id,
    type: fakeUser.type as enums.EUserTypes,
    login: fakeUser.login,
    verified: fakeUser.verified,
  };
  const fakeProfile = {
    ...fakeData.profiles[0],
    initialized: true,
    skills: "63e55edbe8a800060941121d",
    state: enums.ECharacterState.Fight,
  } as IProfileEntity;

  const data: IRemoveAccountDto = {
    password: fakeData.users[0]!.password,
  };

  let accessToken: IFakeOidcKey;
  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUserEntity, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('Missing data', () => {
      it('Account to remove not set', async () => {
        await State.redis.removeAccountToRemove(fakeUser._id);
        const res = await supertest(app).post('/users/remove').auth(accessToken.key, { type: 'bearer' }).send(data);
        const body = res.body as { error: IFullError };
        expect(body.error.message).toEqual('No permission to remove account');
      });

      it('Missing password', async () => {
        const clone = structuredClone(data);
        clone.password = undefined!;
        const res = await supertest(app).post('/users/remove').auth(accessToken.key, { type: 'bearer' }).send(clone);
        const body = res.body as { error: IFullError };
        expect(body.error.message).toEqual('Missing param: password');
      });
    });
  });
  describe('Should pass', () => {
    it(`Remove User`, async () => {
      await State.redis.addAccountToRemove(fakeUser._id);
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: {}, target: EMessageTypes.Send },
      }, enums.EUserTargets.Remove)

      const res = await supertest(app).post('/users/remove').auth(accessToken.key, { type: 'bearer' }).send(data);
      const body = res.body;
      expect(res.status).toEqual(200);
      expect(body).toEqual('');
    });
  });
});
