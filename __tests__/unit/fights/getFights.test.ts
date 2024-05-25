import { describe, expect, it } from '@jest/globals';
import GetFightDto from '../../../src/structure/modules/fights/getFights/dto';
import { IGetFightDto } from '../../../src/structure/modules/fights/getFights/types';

describe('Fights-getFights', () => {
  const data: IGetFightDto = {
    page: 2,
    active: true,
  };
  const owner = '63e55edbe8a800060941121e';
  describe('should throw', () => {
    describe('no data passed', () => {
      it('missing active', () => {
        const clone = structuredClone(data);
        clone.active = undefined!;
        try {
          new GetFightDto(clone, owner);
        } catch (err) {
          expect(err).toBeUndefined();
        }
      });
    });
  });

  describe('should pass', () => {
    it('getFights', () => {
      const clone = structuredClone(data);
      try {
        new GetFightDto(clone, owner);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
