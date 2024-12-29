import { describe, expect, it, afterEach } from '@jest/globals';
import { IFullError } from '../../../src/types/index.js';
import supertest from 'supertest';
import fakeUsers from '../../utils/fakeData/users.json';
import fakeProfiles from '../../utils/fakeData/profiles.json'
import State from '../../../src/tools/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { IGetProfileDto } from '../../../src/modules/profile/subModules/get/types.js';
import { NoDataProvidedError, NoUserWithProvidedName } from '../../../src/errors/index.js';
import { EProfileTargets, EUserTargets } from '../../../src/enums/target.js';
import { EMessageTypes } from '../../../src/enums/connections.js';
import { IProfileEntity } from '../../../src/modules/profile/entity.js';

describe('Get profile', () => {
  const fakeBroker = State.broker as FakeBroker;
  const getProfileDto: IGetProfileDto = {
    name: fakeUsers.data[0]!.login,
    id: fakeUsers.data[0]!._id
  }
  const { app } = State.router;

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`No data`, async () => {
        const target = new NoDataProvidedError()
        const clone = structuredClone(getProfileDto);

        clone.id = undefined!;
        clone.name = undefined!

        const res = await supertest(app).get('/profile').send(clone);
        const {error} = res.body as { error: IFullError };

        expect(error.message).toEqual(target.message);
        expect(error.code).toEqual(target.code);
        expect(error.code).toEqual(target.code)
        expect(res.status).toEqual(target.status)
      });
    });

    describe('Incorrect data', () => {
      it(`Missing id - no data in database`, async () => {
        const target = new NoUserWithProvidedName()
        const clone = structuredClone(getProfileDto);
        clone.id = undefined!

        const res = await supertest(app).get('/profile').send(clone);
        const {error} = res.body as { error: IFullError };

        expect(error.message).toEqual(target.message);
        expect(error.code).toEqual(target.code);
        expect(error.code).toEqual(target.code)
        expect(res.status).toEqual(target.status)
      });

      it(`Missing name - no data in database`, async () => {
        const target = new NoUserWithProvidedName()
        const clone = structuredClone(getProfileDto);
        clone.name = undefined!

        const res = await supertest(app).get('/profile').send(clone);
        const {error} = res.body as { error: IFullError };

        expect(error.message).toEqual(target.message);
        expect(error.code).toEqual(target.code);
        expect(error.code).toEqual(target.code)
        expect(res.status).toEqual(target.status)
      });
    });
  });

  describe('Should pass', () => {
    it(`Validated register`, async () => {
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: [fakeUsers.data[0] as Record<string, unknown>], target: EMessageTypes.Send },
      }, EUserTargets.GetName)
    fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: fakeProfiles.data[0] as Record<string, unknown>, target: EMessageTypes.Send },
      }, EProfileTargets.Get)

      const res = await supertest(app)
        .get('/profile')
        .send(getProfileDto);
      const { data } = res.body as { data: IProfileEntity }

      expect(data._id).toEqual(fakeProfiles.data[0]!._id);
      expect(data.user).toEqual(fakeProfiles.data[0]!.user);
    });
  });
});
