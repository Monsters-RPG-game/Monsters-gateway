import { beforeAll, afterEach, describe, expect, it } from '@jest/globals';
import { IFullError } from '../../../src/types/index.js';
import { IUserEntity } from '../../../src/modules/user/entity.js';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import * as errors from '../../../src/errors/index.js'
import fakeProfiles from '../../utils/fakeData/profiles.json';
import fakeUsers from '../../utils/fakeData/users.json'
import fakeSkills from '../../utils/fakeData/skils.json'
import * as types from '../../types/index.js';
import { IFakeOidcKey } from '../../types/index.js';
import State from '../../../src/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import type { ISkillsEntityDetailed } from '../../../src/modules/skills/getDetailed/types.js';

describe('Profiles - add', () => {
  const fakeBroker = State.broker as FakeBroker;
  const addProfile: types.IAddProfileDto = {
    race: enums.EUserRace.Elf,
    location: "asdasda"
  };
  let accessToken: IFakeOidcKey;
  let accessToken2: IFakeOidcKey;
  const fakeSkill = fakeSkills.data[1] as ISkillsEntityDetailed;
  const fakeSkill2 = fakeSkills.data[1] as ISkillsEntityDetailed;
  const fakeUser = fakeUsers.data[0] as IUserEntity;
  const fakeProfile = fakeProfiles.data[0] as types.IProfileEntity
  const fakeUser2 = fakeUsers.data[1] as IUserEntity;
  const fakeProfile2 = fakeProfiles.data[1] as types.IProfileEntity
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    accessToken2 = fakeAccessToken(fakeUser2._id, 2);

    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addCachedUser({ account: fakeUser2, profile: fakeProfile2 });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
    await State.redis.addOidc(accessToken2.key, accessToken2.key, accessToken2.body);
    await State.redis.addCachedSkills(fakeSkill, fakeUser._id);
    await State.redis.addCachedSkills(fakeSkill2, fakeUser2._id);
  });

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`Missing race`, async () => {
        const clone = structuredClone(addProfile);
        clone.race = undefined!

        fakeBroker.addAction({
          shouldFail: false,
          returns: {
            payload: [
              {
                _id: fakeUser._id,
                login: fakeUser.login,
                verified: false,
                type: enums.EUserTypes.User,
              },
            ],
            target: enums.EMessageTypes.Send,
          },
        }, enums.EUserTargets.GetName)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
        }, enums.ECharacterLocationTargets.Create)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { _id: fakeUser._id, initialized: false }, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Get)


        const res = await supertest(app).post('/profile').auth(accessToken.key, { type: 'bearer' }).send(clone);
        const body = res.body as { error: IFullError };
        const target = new errors.MissingArgError('race');

        expect(body.error.message).toEqual(target.message);
      });
    });

    describe('Incorrect data', () => {
      it(`Incorrect race`, async () => {
        const target = new Error('race has incorrect type') as unknown as Record<string, unknown>;
        fakeBroker.addAction({
          shouldFail: false,
          returns: {
            payload: [
              {
                _id: fakeUser._id,
                login: fakeUser.login,
                verified: false,
                type: enums.EUserTypes.User,
              },
            ],
            target: enums.EMessageTypes.Send,
          },
        }, enums.EUserTargets.GetName)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { _id: fakeUser._id }, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Get)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
        }, enums.ECharacterLocationTargets.Create)

        fakeBroker.addAction({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Create)

        const res = await supertest(app)
          .post('/profile')
          .auth(accessToken.key, { type: 'bearer' })
          .send({ ...addProfile, race: 'abc' });
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('race has incorrect type');
      });

      it(`Profile already exists`, async () => {
        const target = new Error('Profile already initialized') as unknown as Record<string, unknown>;
        fakeBroker.addAction({
          shouldFail: false,
          returns: {
            payload: [
              {
                _id: fakeUser2._id,
                login: fakeUser2.login,
                verified: false,
                type: enums.EUserTypes.User,
              },
            ],
            target: enums.EMessageTypes.Send,
          },
        }, enums.EUserTargets.GetName)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { _id: fakeUser2._id }, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Get)

        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
        }, enums.ECharacterLocationTargets.Create)

        fakeBroker.addAction({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        }, enums.EProfileTargets.Create)

        const res = await supertest(app).post('/profile').auth(accessToken2.key, { type: 'bearer' }).send(addProfile);
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual('Profile already initialized');
      });
    });
  });

  describe('Should pass', () => {
    it(`Add profile`, async () => {
      fakeBroker.addAction({
        shouldFail: false,
        returns: {
          payload: [
            {
              _id: fakeUser._id,
              login: fakeUser.login,
              verified: false,
              type: enums.EUserTypes.User,
            },
          ],
          target: enums.EMessageTypes.Send,
        },
      }, enums.EUserTargets.GetName)

      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: { id: 'testMap' }, target: enums.EMessageTypes.Send },
      }, enums.ECharacterLocationTargets.Create)

      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: { _id: fakeUser._id, initialized: false }, target: enums.EMessageTypes.Send },
      }, enums.EProfileTargets.Create)

      const res = await supertest(app)
        .post('/profile')
        .auth(accessToken2.key, { type: 'bearer' })
        .send({ ...addProfile });

      expect(res.status).toEqual(200);
    });
  });
});
