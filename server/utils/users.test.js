'use strict'

const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Steve',
        room: 'A course'
      },
      {
        id: '2',
        name: 'Jeff',
        room: 'B course'
      },
      {
        id: '3',
        name: 'George',
        room: 'A course'
      }
    ];
  });
  describe('addUser',()  => {
    it('should add new user', () => {
      const users = new Users();
      const user = {
        id: 27,
        name: 'Steve',
        room: 'Office fans'
      };
      const results = users.addUser(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
    });
  });
  describe('getUserList', () => {
    it('should return names for node A course', () => {
      const results = users.getUserList('A course');
      expect(results).toEqual(['Steve', 'George']);
    });
    it('should return names for node B course', () => {
      const results = users.getUserList('B course');
      expect(results).toEqual(['Jeff']);
    });
  });
  describe('removeUser', () => {
    it('should remove user', () => {
      const id = '2'
      const results = users.removeUser(id);
      expect(results.id).toBe(id);
      expect(users.users.length).toBe(2);
    });
    it('should not remove user', () => {
      const results = users.removeUser('5');
      expect(results).toBeUndefined();
      expect(users.users.length).toBe(3);
    });
  });
  describe('getUser', () => {
    it('should find user', () => {
      const id = "1";
      const result = users.getUser(id);
      expect(result.id).toBe(id);
    });
    it('should not find user', () => {
      const id = '5';
      const results = users.getUser(id);
      expect(results).toBeUndefined();
    });
  })
});
