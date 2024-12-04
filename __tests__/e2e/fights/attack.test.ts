import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import * as enums from '../../../src/enums/index.js';
import { MissingArgError } from '../../../src/errors/index.js';
import State from '../../../src/state.js';
import { IAttackDto } from '../../../src/modules/fights/attack/types.js';
import { IUserEntity } from '../../../src/modules/user/entity.js';
import fakeUsers from '../../utils/fakeData/users.json'
import fakeProfiles from '../../utils/fakeData/profiles.json'
import { IFakeOidcKey, IProfileEntity } from '../../types/index.js';
import { fakeAccessToken } from '../../utils/index.js';
import { IFullError } from '../../../src/types/errors.js';

describe('Fights - attack', () => {
  const fakeTarget = fakeUsers.data[0]!._id;
  const fakeUser = fakeUsers.data[0] as IUserEntity;
  const fakeProfile = {
    ...fakeProfiles.data[0],
    initialized: true,
    state: enums.ECharacterState.Fight,
    skills: "63e55edbe8a800060941121d"
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
