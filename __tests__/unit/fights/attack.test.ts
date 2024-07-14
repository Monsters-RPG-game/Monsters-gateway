import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import AttackDto from '../../../src/structure/modules/fights/attack/dto.js';
import type { IAttackDto } from '../../../src/structure/modules/fights/attack/types.js';

describe('Fights - attack', () => {
  const data: IAttackDto = {
    target: '63e55edbe8a800060941121d',
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing target', () => {
        const clone = structuredClone(data);
        clone.target = undefined!;
        try {
          new AttackDto(clone);
        } catch (error) {
          expect(error).toEqual(new errors.MissingArgError('target'));
        }
      });
    });

    describe('Incorrect data', () => {
      it('Target incorrect type', () => {
        const clone = structuredClone(data);
        clone.target = 'as';
        try {
          new AttackDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('target'));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Attack', () => {
      const clone = structuredClone(data);
      try {
        new AttackDto(clone);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
