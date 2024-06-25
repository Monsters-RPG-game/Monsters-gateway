import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import { MissingArgError } from '../../../src/errors/index.js';
import State from '../../../src/state.js';
import { IAttackDto } from '../../../src/structure/modules/fights/attack/types.js';
import { IUserEntity } from '../../../src/structure/modules/user/entity.js';
import fakeData from '../../fakeData.json';
import { IFakeOidcKey, IProfileEntity } from '../../types/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import { IFullError } from '../../../src/types/errors.js';

describe('Fights - attack', () => {
  const fakeTarget = fakeData.users[0]!._id;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeProfile = {
    ...fakeData.profiles[0],
    initialized: true,
    state: enums.ECharacterState.Fight,
  } as IProfileEntity;
  let accessToken: IFakeOidcKey;

  beforeAll(async () => {
    accessToken = fakeAccessToken(fakeUser._id, 1);
    await State.redis.addCachedUser({ account: fakeUser, profile: fakeProfile });
    await State.redis.addOidc(accessToken.key, accessToken.key, accessToken.body);
  });

  const payload: IAttackDto = {
    target: fakeTarget,
  };
  const { app } = State.router;

  describe('should throw', () => {
    describe('no data passed', () => {
      it('missing target', async () => {
        const clone = structuredClone(payload);
        clone.target = undefined!;
        const res = await supertest(app).post('/fights/attack').auth(accessToken.key, { type: 'bearer' }).send(clone);
        const body = res.body as { error: IFullError };
        const target = new MissingArgError('target');

        expect(body.error.message).toEqual(target.message);
      });
    });
  });
  describe('should pass', () => {
    it('Attack', async () => {
      const clone = structuredClone(payload);
      const res = await supertest(app).post('/fights/attack').auth(accessToken.key, { type: 'bearer' }).send(clone);

      expect(res.status).toEqual(200);
    });
  });
});
