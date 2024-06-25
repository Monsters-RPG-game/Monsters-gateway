import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import AddBugReport from '../../../src/structure/modules/bugReport/add/dto.js';
import type { IAddBugReport } from '../../../src/structure/modules/bugReport/add/types.js';

describe('BugReport - add', () => {
  const data: IAddBugReport = {
    message: 'some message',
    user: 'someid',
  };
  const fakeUser = 'some fake user id';

  describe('should throw', () => {
    describe('missing data', () => {
      it('missing message', () => {
        const clone = structuredClone(data);
        clone.message = undefined!;
        try {
          new AddBugReport(clone, fakeUser);
        } catch (err) {
          expect(err).toEqual(new errors.MissingArgError('message'));
        }
      });
      it('missing user', () => {
        const emptyUser = undefined!;
        try {
          new AddBugReport(data, emptyUser);
        } catch (err) {
          expect(err).toEqual(new errors.MissingArgError('user'));
        }
      });
    });
  });
  describe('should pass', () => {
    it('Add', () => {
      try {
        new AddBugReport(data, fakeUser);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
