import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums';
import * as errors from '../../../src/errors';
import State from '../../../src/state';
import { IGetFightDto } from '../../../src/structure/modules/fights/getFights/types';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import { IFullError } from '../../../src/types';
import fakeData from '../../fakeData.json';
import { IFakeOidcKey, IProfileEntity } from '../../types';
import { fakeAccessToken } from '../../utils';
import { FakeBroker } from '../../utils/mocks';

describe('Fights - getFight', () => {
  const fakeBroker = State.broker as FakeBroker;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeProfile = {
    ...fakeData.profiles[0],
    initialized: true,
    skills:"63e55edbe8a800060941121d",
    state: enums.ECharacterState.Fight,
  } as IProfileEntity;

  const data: IGetFightDto = {
    page: 2,
    active: true,
  };
  let accessToken: IFakeOidcKey;
  const { app } = State.router;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });

  describe('should throw', () => {
    describe('no data pass', () => {
      it('missing active', async () => {
        const target = new errors.MissingArgError('active') as unknown as Record<string, unknown>;
        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: target, target: enums.EMessageTypes.Send },
        });
        const res = await supertest(app)
          .get('/fights')
          .auth(accessToken.key, { type: 'bearer' })
          .query({ active: undefined })
          .send();
        const body = res.body as { error: IFullError };

        expect(body.error.message).toEqual(target.message);
      });
    });
  });

  describe('should pass', () => {
    it('GetFight', async () => {
      fakeBroker.actions.push({
        shouldFail: false,
        returns: { payload: [], target: enums.EMessageTypes.Send },
      });
      const res = await supertest(app).get('/fights').auth(accessToken.key, { type: 'bearer' }).query(data).send();

      expect(res.status).toEqual(200);
    });
  });
});
