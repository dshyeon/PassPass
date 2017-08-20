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
        const firstNames = [];
        for (var i = 0; i < 3; i++) {
          firstNames.push(results[i].first_name);
        }
        expect(firstNames).toEqual(['Billy', 'Sally', 'David']);
        done();
      });
    });
    test('contains a for_sale_block table with seller_id column', (done) => {
      // Note this matches dummy data in schema.sql
      var queryString = 'SELECT * FROM for_sale_block';
      db.connection.query(queryString, (err, results) => {
        if (err) { return done(err); }
        const sellerIds = results.map((result) => {
          return result.seller_id;
        });
        expect(sellerIds).toEqual([2, 2, 1, 1, 1]);
        done();
      });
    });
  });
});
