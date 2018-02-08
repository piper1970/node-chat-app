'use strict'

const expect = require('expect');
const {isRealString} = require('./validation');

describe('validation', () => {
  describe('isRealString', () => {
    it('should reject non-string values', () => {
      const testParam = 99;
      const results = isRealString(testParam);
      expect(results).toBe(false);
    });
    it('should reject strings with only spaces', () => {
      const testParam = '      ';
      const results = isRealString(testParam);
      expect(results).toBe(false);
    });
    it('should allow strings with non-space characters', () => {
      const testParam = '  Whatever it says  ';
      const results = isRealString(testParam);
      expect(results).toBe(true);
    });
  });
});
