/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var expect = require('chai').expect;

xdescribe('Database', function() {
  var dbConnection;

  // beforeEach(function(done) {
  //   // TODO
  //   dbConnection = mysql.createConnection({
  //     user: 'root',
  //     password: '',
  //     database: 'TODO'
  //   });
  //   dbConnection.connect();

  //   var tablename = 'users';

  //    Empty the db table before each test so that multiple tests
  //    * (or repeated runs of the tests) won't screw each other up: 
  //   dbConnection.query('truncate ' + tablename, done);
  // });

  // afterEach(function() {
  //   dbConnection.end();
  // });

  describe('Database Schema:', function() {
    it('contains a users table', function(done) {
      var queryString = 'SELECT * FROM users';
      db.query(queryString, function(err, results) {
        if (err) { return done(err); }
        expect(results).to.deep.equal([]);
        done();
      });
    });
  });
});