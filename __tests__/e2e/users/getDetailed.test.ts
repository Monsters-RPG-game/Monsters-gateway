import { describe, expect, it, afterEach } from '@jest/globals';
import supertest from 'supertest';
import { createCookie } from '../../utils/index.js'
import TokensController from '../../../src/modules/tokens/index.js';
import fakeUsers from '../../utils/fakeData/users.json'
import fakeProfiles from '../../utils/fakeData/profiles.json'
import State from '../../../src/tools/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { IUserDetailsDto } from '../../../src/modules/users/subModules/details/types.js';
import { IFullError } from '../../../src/types/index.js';
import KeyController from '../../../src/modules/keys/index.js'
import { MissingArgError } from '../../../src/errors/index.js';
import { EMessageTypes, EProfileSubTargets, ETokens, EUserSubTargets } from '../../../src/enums/index.js';
import { IUserEntity } from '../../../src/modules/users/entity';
import KeyRepository from '../../../src/modules/keys/repository/index.js';
import KeyModel from '../../../src/modules/keys/model.js';
import mongoose from 'mongoose';

describe('Get detailed', () => {
  const fakeBroker = State.broker as FakeBroker;
  const keyRepository = new KeyRepository(KeyModel)
  const getUserDetailsDto: IUserDetailsDto = {
    id: fakeUsers.data[0]!._id,
    name: fakeUsers.data[0]!.login
  }
  const userEntity: IUserEntity = {
    _id: fakeUsers.data[0]!._id as string,
    userId: new mongoose.Types.ObjectId().toString(),
    login: fakeUsers.data[0]!.login,
  }
  const { app } = State.router;

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`No data provided`, async () => {
      const keyId = await new KeyController().createKeys()
      const tokenController = new TokensController(fakeUsers.data[0]!._id);
      const userToken = await tokenController.createAccessToken(userEntity)
      await State.redis.addUserTokens(userEntity._id as string, 'test', 'test')
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: [fakeUsers.data[0] as Record<string, unknown>], target: EMessageTypes.Send },
      }, EUserSubTargets.GetName)
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: [fakeUsers.data[0] as Record<string, unknown>], target: EMessageTypes.Send },
      }, EUserSubTargets.GetName)
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: fakeProfiles.data[0] as Record<string, unknown>, target: EMessageTypes.Send },
      }, EProfileSubTargets.Get)

        const target = new MissingArgError('name')

        const res = await supertest(app)
          .get(`/user/details`)
          .set('Cookie', createCookie(ETokens.Access, userToken))
          .send();
        const { error } = res.body as { error: IFullError }

        await keyRepository.remove(keyId)

        expect(error.message).toEqual(target.message);
        expect(error.code).toEqual(target.code);
        expect(error.code).toEqual(target.code)
        expect(res.status).toEqual(target.status)
      });
    });
  });

  describe('Should pass', () => {
      it(`Get data`, async () => {
      const keyId = await new KeyController().createKeys()
      const tokenController = new TokensController(fakeUsers.data[0]!._id);
      const userToken = await tokenController.createAccessToken(userEntity)
      await State.redis.addUserTokens(userEntity._id as string, 'test', 'test')
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: [fakeUsers.data[0] as Record<string, unknown>], target: EMessageTypes.Send },
      }, EUserSubTargets.GetName)
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: [fakeUsers.data[0] as Record<string, unknown>], target: EMessageTypes.Send },
      }, EUserSubTargets.GetName)
      fakeBroker.addAction({
        shouldFail: false,
        returns: { payload: fakeProfiles.data[0] as Record<string, unknown>, target: EMessageTypes.Send },
      }, EProfileSubTargets.Get)
        fakeBroker.addAction({
          shouldFail: false,
          returns: { payload: [fakeUsers.data[0]!], target: EMessageTypes.Send },
        }, EUserSubTargets.GetName)

        const res = await supertest(app)
        .get(`/user/details?${new URLSearchParams(getUserDetailsDto as Record<string, string>)}`)
        .set('Cookie', createCookie(ETokens.Access, userToken))
        .send();
        const body = res.body as { data: IUserEntity[] }

        await keyRepository.remove(keyId)

        expect(res.status).toEqual(200)
        expect(body.data.length).toEqual(1)
        expect(body.data[0]!.login).toEqual(fakeUsers.data[0]!.login)
      });
  });
});
