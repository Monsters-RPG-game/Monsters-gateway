import { beforeAll, describe, expect, it } from '@jest/globals';
import { IFullError } from '../../../src/types';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import supertest from 'supertest';
import * as enums from '../../../src/enums';
import { EUserTypes } from '../../../src/enums';
import fakeData from '../../fakeData.json';
import * as types from '../../types';
import { IFakeOidcKey } from '../../types';
import State from '../../../src/state';
import { MissingArgError } from '../../../src/errors';
import { FakeBroker } from '../../utils/mocks';
import { fakeAccessToken } from '../../utils';

describe('Profiles - add', () => {
  const fakeBroker = State.broker as FakeBroker;
  const addProfile: types.IAddProfileDto = {
    race: enums.EUserRace.Elf,
  };
  let accessToken: IFakeOidcKey;
  let accessToken2: IFakeOidcKey;
  let accessToken3: IFakeOidcKey;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeUser2 = fakeData.users[1] as IUserEntity;
  const fakeUser3 = fakeData.users[2] as IUserEntity;
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    accessToken2 = fakeAccessToken(fakeUser2._id, 2);
    accessToken3 = fakeAccessToken(fakeUser3._id, 3);

    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
    await State.redis.addOidc(accessToken2.key, accessToken2.key, accessToken2.body);
    await State.redis.addOidc(accessToken3.key, accessToken3.key, accessToken3.body);
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`Missing race`, async () => {
        const clone = structuredClone(addProfile);
        delete clone.race;

        fakeBroker.actions.push({
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
        });
        fakeBroker.actions.push({
          shouldFail: false,
          returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
        });
        fakeBroker.actions.push({
          shouldFail: false,
          returns: { payload: { _id: fakeUser._id, initialized: false }, target: enums.EMessageTypes.Send },
        });

        const res = await supertest(app).post('/profile').auth(accessToken.key, { type: 'bearer' }).send(clone);
        const body = res.body as { error: IFullError };
        const target = new MissingArgError('race');

        expect(body.error.message).toEqual(target.message);
      });
    });

    describe('Incorrect data', () => {
      it(`Incorrect race`, async () => {
        const target = new Error('race has incorrect type') as unknown as Record<string, unknown>;
        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        });

        const res = await supertest(app)
          .post('/profile')
          .auth(accessToken.key, { type: 'bearer' })
          .send({ ...addProfile, race: 'abc' });
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('race has incorrect type');
      });

      it(`Profile already exists`, async () => {
        const target = new Error('Profile already initialized') as unknown as Record<string, unknown>;
        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        });

        const res = await supertest(app).post('/profile').auth(accessToken3.key, { type: 'bearer' }).send(addProfile);
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('Profile already initialized');
      });
    });
  });

  describe('Should pass', () => {
    it(`Add profile`, async () => {
      fakeBroker.actions.push({
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
      });
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
      });
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
      });
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: { _id: fakeUser._id, initialized: false }, target: enums.EMessageTypes.Send },
      });
      const res = await supertest(app)
        .post('/profile')
        .auth(accessToken2.key, { type: 'bearer' })
        .send({ ...addProfile });

      expect(res.status).toEqual(200);
    });
  });
});
