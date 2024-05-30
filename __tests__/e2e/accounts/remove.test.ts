import { beforeAll, describe, expect, it } from '@jest/globals';
// import * as types from '../../types';
import supertest from 'supertest';
import * as enums from '../../../src/enums';
import fakeData from '../../fakeData.json';
import State from '../../../src/state';
import { FakeBroker } from '../../utils/mocks';
import { EMessageTypes } from '../../../src/enums';
import { IRemoveAccountDto } from '../../../src/structure/modules/user/remove/types';
import { IFakeOidcKey, IProfileEntity } from '../../types';
import { fakeAccessToken } from '../../utils';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import { IFullError } from '../../../src/types';
// import { beforeEach } from 'node:test';

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
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: {}, target: EMessageTypes.Send },
      });

      const res = await supertest(app).post('/users/remove').auth(accessToken.key, { type: 'bearer' }).send(data);
      const body = res.body;
      expect(res.status).toEqual(200);
      expect(body).toEqual('');
    });
  });
});
