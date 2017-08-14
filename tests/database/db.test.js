/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var db = require('../../database/index');
var server = require('../../server/index');

describe('Database', () => {

  describe('Database Schema:', () => {
    test('contains a users table with first_name column', (done) => {
      // Note this matches dummy data in schema.sql
      var queryString = 'SELECT first_name FROM users';
      db.connection.query(queryString, (err, results) => {
        if (err) { return done(err); }
        const firstNames = results.map((result) => result.first_name);
        expect(firstNames).toEqual(['Kelly', 'Brenda', 'David']);
        done();
      });
    });
  });
});