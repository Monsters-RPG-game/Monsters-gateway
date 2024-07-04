import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import { EUserRace } from '../../../src/enums/index.js';
import * as types from '../../types/index.js';
import AddProfileDto from '../../../src/structure/modules/profile/add/dto.js';

describe('Profile - add', () => {
  const addProfile: types.IAddProfileDto = {
    race: EUserRace.Elf,
    location: 'asdaksjdalhsdf',
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it(`Missing race`, () => {
        const clone = structuredClone(addProfile);
        clone.race = undefined!;

        const func = () => new AddProfileDto(clone, 'fakeMap');

        expect(func).toThrow(new errors.MissingArgError('race'));
      });
    });
  });

  describe('Should pass', () => {
    it(`Add profile`, () => {
      const func = () => new AddProfileDto(addProfile, 'fakeMap');
      expect(func).not.toThrow();
    });
  });
});
