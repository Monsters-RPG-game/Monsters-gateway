import { describe, expect, it, afterEach } from '@jest/globals';
import { createCookie } from '../../utils/index.js'
import { IFullError } from '../../../src/types/index.js';
import supertest from 'supertest';
import fakeUsers from '../../utils/fakeData/users.json';
import fakeProfiles from '../../utils/fakeData/profiles.json'
import State from '../../../src/tools/state.js';
import { FakeBroker } from '../../utils/mocks/index.js';
import { NoDataProvidedError, UnauthorizedError } from '../../../src/errors/index.js';
import { EProfileSubTargets, EUserSubTargets } from '../../../src/enums/target.js';
import { EMessageTypes } from '../../../src/enums/connections.js';
import { ETokens } from '../../../src/enums/tokens.js';
import KeyController from '../../../src/modules/keys/index.js'
import TokensController from '../../../src/modules/tokens/index.js';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import mongoose from 'mongoose';
import KeyRepository from '../../../src/modules/keys/repository/index.js';
import KeyModel from '../../../src/modules/keys/model.js';

describe('Get profile - validate auth', () => {
  const fakeBroker = State.broker as FakeBroker;
  const { app } = State.router;
  const keyRepository = new KeyRepository(KeyModel)
  const userEntity: IUserEntity = {
    _id: fakeUsers.data[0]!._id as string,
    userId: new mongoose.Types.ObjectId().toString(),
    login: fakeUsers.data[0]!.login,
  }

  afterEach(() => {
    fakeBroker.getStats()
  })

  describe('Should pass', () => {
    it(`User not authorized`, async () => {
      const target = new UnauthorizedError()

      const res = await supertest(app).get(`/profile`).send();
      const {error} = res.body as { error: IFullError };

      expect(error.message).toEqual(target.message);
      expect(error.code).toEqual(target.code);
      expect(error.code).toEqual(target.code)
      expect(res.status).toEqual(target.status)
      });

    it(`No data`, async () => {
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
      const target = new NoDataProvidedError()

      const res = await supertest(app).get(`/profile`).set('Cookie', createCookie(ETokens.Access, userToken)).send();
      const {error} = res.body as { error: IFullError };

      await keyRepository.remove(keyId)

      expect(error.message).toEqual(target.message);
      expect(error.code).toEqual(target.code);
      expect(error.code).toEqual(target.code)
      expect(res.status).toEqual(target.status)
    });
  });
});
