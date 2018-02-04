'use strict'

const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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
  describe('generateLocationMessage functions', () => {
    it('should generate the correct location message object', () => {

      const latitude = 45.5144613;
      const longitude = -122.85525559999999;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const from = 'TestUser';
      const results = generateLocationMessage(from, latitude, longitude);

      expect(results).toBeTruthy();
      expect(results.from).toEqual(from);
      expect(results.url).toEqual(url);
      expect(typeof results.createdAt).toEqual('number');
    });
  });
});
