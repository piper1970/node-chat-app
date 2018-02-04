'use strict'

const expect = require('expect');
const {generateMessage} = require('./message');

describe('Message functions', () => {
  describe('generateMessage', () => {
    it('should generate the correct message object', () => {
      const from = 'test@test.com',
        text = 'test text';
      const results = generateMessage(from, text);

      expect(results).toBeTruthy();
      expect(results.from).toEqual(from);
      expect(results.text).toEqual(text);
      expect(typeof results.createdAt).toEqual('number');
    });
  });
});
