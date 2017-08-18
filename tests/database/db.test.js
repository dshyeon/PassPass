/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var db = require('../../database/index');
var server = require('../../server/index');

describe('Database', () => {

  describe('Database Schema:', () => {
    xtest('contains a users table with first_name column', (done) => {
      // Note this matches dummy data in schema.sql
      var queryString = 'SELECT first_name FROM users';
      db.connection.query(queryString, (err, results) => {
        if (err) { return done(err); }
        const firstNames = results.map((result) => result.first_name);
        expect(firstNames).toEqual(['Kelly', 'Brenda', 'David']);
        done();
      });
    });
    test('contains a for_sale_block table with seller_id column', (done) => {
      // Note this matches dummy data in schema.sql
      var queryString = 'SELECT seller_id FROM for_sale_block';
      db.connection.query(queryString, (err, results) => {
        if (err) { return done(err); }
        const sellerIds = results.map((result) => result.seller_id);
        expect(sellerIds).toEqual([1, 1, 1, 2, 2]);
        done();
      });
    });
  });
});