import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import GetFightLogsDto from '../../../src/structure/modules/fights/getLogs/dto';
import { IGetFightLogsDto } from '../../../src/structure/modules/fights/getLogs/types';

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
