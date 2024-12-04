import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import GetFightLogsDto from '../../../src/modules/fights/getLogs/dto.js';
import type { IGetFightLogsDto } from '../../../src/modules/fights/getLogs/types.js';

describe('fights-getLogs', () => {
  const data: IGetFightLogsDto = {
    id: '63e55edbe8a800060941127d',
  };

  describe('should throw', () => {
    describe('No data passed', () => {
      it('missing id', () => {
        const clone = structuredClone(data);
        clone.id = undefined!;
        try {
          new GetFightLogsDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.MissingArgError('id'));
        }
      });
    });
  });

  describe('should pass', () => {
    it('getLogs', () => {
      const clone = structuredClone(data);
      try {
        new GetFightLogsDto(clone);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
