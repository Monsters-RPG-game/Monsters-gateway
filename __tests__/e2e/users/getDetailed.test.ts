import { describe, expect, it, afterEach } from '@jest/globals';
import supertest from 'supertest';
import fakeUsers from '../../utils/fakeData/users.json'
import State from '../../../src/tools/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { IUserDetailsDto } from '../../../src/modules/users/subModules/details/types.js';
import { IFullError } from '../../../src/types/index.js';
import { MissingArgError } from '../../../src/errors/index.js';
import { EMessageTypes, EUserSubTargets } from '../../../src/enums/index.js';
import { IUserEntity } from '../../../src/modules/users/entity';

describe('Get detailed', () => {
  const fakeBroker = State.broker as FakeBroker;
  const getUserDetailsDto: IUserDetailsDto = {
    id: fakeUsers.data[0]!._id,
    name: fakeUsers.data[0]!.login
  }
  const { app } = State.router;

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`No data provided`, async () => {
        const target = new MissingArgError('name')

        const res = await supertest(app).get(`/user/details`).send();
        const { error } = res.body as { error: IFullError }

        expect(error.message).toEqual(target.message);
        expect(error.code).toEqual(target.code);
        expect(error.code).toEqual(target.code)
        expect(res.status).toEqual(target.status)
      });
    });
  });

  describe('Should pass', () => {
      it(`Get data`, async () => {
        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: [fakeUsers.data[0]!], target: EMessageTypes.Send },
        }, EUserSubTargets.GetName)

        const res = await supertest(app).get(`/user/details?${new URLSearchParams(getUserDetailsDto as Record<string, string>)}`).send();
        const body = res.body as { data: IUserEntity[] }

        expect(res.status).toEqual(200)
        expect(body.data.length).toEqual(1)
        expect(body.data[0]!.login).toEqual(fakeUsers.data[0]!.login)
      });
  });
});
