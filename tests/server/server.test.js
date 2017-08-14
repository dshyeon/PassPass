var supertest = require('supertest');
var path = require('path');
var server = require('../../server/index');

var superReq = supertest.agent(server);

describe('Server', function() {
  describe('GET Static Files', function() {
    test('should return the content of index.html', function(done) {
      superReq
        .get('/')
        .expect(200, /<div id="appLoggedOut"/, done);
    });

    test('should return the content of logged-in.html', function(done) {
      superReq
        .get('/logged-in.html')
        .expect(200, /<div id="appLoggedIn"/, done);
    });
  });

  xdescribe('Account Creation', function() {
    test('signup creates a new user record', function(done) {
      superReq
        .post('/signup')
        .type('form')
        .send({
          username: 'Cortin',
          password: 'Cortin'
        })
        .expect(201, function(err) {
          done(err);
        });
    });
  });
});
