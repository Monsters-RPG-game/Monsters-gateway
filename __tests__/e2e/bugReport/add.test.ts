import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import * as errors from '../../../src/errors/index.js';
import State from '../../../src/state.js';
import type { IAddBugReport } from '../../../src/structure/modules/bugReport/add/types.js';
import { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import { IFullError } from '../../../src/types/index.js';
import fakeData from '../../fakeData.json';
import * as types from '../../types/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import { FakeBroker } from '../../utils/mocks/index.js';

describe('BugReport - add', () => {
  const fakeBroker = State.broker as FakeBroker;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeProfile = {
    ...fakeData.profiles[0],
    initialized: true,
    state: enums.ECharacterState.Fight,
  } as types.IProfileEntity;
  let accessToken: types.IFakeOidcKey;

  const payload: IAddBugReport = {
    message: 'some message',
    user: fakeUser._id,
  };

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });

  const { app } = State.router;

  describe('should throw', () => {
    describe('no data passed', () => {
      it('missing message', async () => {
        const clone = structuredClone(payload);
        clone.message = undefined!;
        const res = await supertest(app).post('/bug').auth(accessToken.key, { type: 'bearer' }).send(clone);
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('Missing param: message');
      });
      it('missing user', async () => {
        const target = new errors.MissingArgError('user') as unknown as Record<string, unknown>;
        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        });
        const res = await supertest(app).post('/bug').auth(accessToken.key, { type: 'bearer' }).send(payload);
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('Missing param: user');
      });
    });
  });
  describe('should pass', () => {
    it('Add', async () => {
      const res = await supertest(app).post('/bug').auth(accessToken.key, { type: 'bearer' }).send(payload);

      expect(res.status).toEqual(200);
    });
  });
});
