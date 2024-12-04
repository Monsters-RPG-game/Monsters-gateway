import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import * as types from '../../types/index.js';
import GetProfileDto from '../../../src/modules/profile/get/dto.js';

describe('Profile - get', () => {
  const getProfile: types.IGetProfileDto = {
    id: '63e55edbe8a800060941121d',
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`Missing id`, () => {
        const clone = structuredClone(getProfile);
        clone.id = undefined!;
        const func = () => new GetProfileDto(clone.id);

        expect(func).toThrow(new errors.MissingArgError('id'));
      });
    });
  });

  describe('Should pass', () => {
    it(`Validated req`, () => {
      const func = () => new GetProfileDto(getProfile.id);
      expect(func).not.toThrow();
    });
  });
});
