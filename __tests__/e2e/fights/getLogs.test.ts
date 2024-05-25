import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums';
import * as errors from '../../../src/errors';
import State from '../../../src/state';
import { IGetFightLogsDto } from '../../../src/structure/modules/fights/getLogs/types';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import { IFullError } from '../../../src/types';
import fakeData from '../../fakeData.json';
import { IFakeOidcKey, IProfileEntity } from '../../types';
import { fakeAccessToken } from '../../utils';
import { FakeBroker } from '../../utils/mocks';

describe('Fights-getLogs', () => {
  const fakeBroker = State.broker as FakeBroker;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeProfile = {
    ...fakeData.profiles[0],
    initialized: true,
    state: enums.ECharacterState.Fight,
  } as IProfileEntity;
  let accessToken: IFakeOidcKey;
  const { app } = State.router;

  const data: IGetFightLogsDto = {
    id: '63e55edbe8a800060941127d',
  };

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });
  describe('should throw', () => {
    describe('No data passed', () => {
      it('missing id', async () => {
        const target = new errors.MissingArgError('id') as unknown as Record<string, unknown>;
        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        });
        const res = await supertest(app)
          .get('/fights/logs')
          .auth(accessToken.key, { type: 'bearer' })
          .query({ id: undefined })
          .send();
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual(target.message);
      });
    });
  });

  describe('should pass', () => {
    it('getLogs', async () => {
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: [], target: enums.EMessageTypes.Send },
      });
      const res = await supertest(app).get('/fights/logs').auth(accessToken.key, { type: 'bearer' }).query(data);

      expect(res.status).toEqual(200);
    });
  });
});
