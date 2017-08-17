var supertest = require('supertest');
var path = require('path');
var server = require('../../server/index');

var superReq = supertest.agent(server);

describe('Server', function() {
  describe('GET Static Files', () => {
    test('should return the content of index.html', (done) => {
      superReq
        .get('/')
        .expect(200, /<div id="appLoggedOut"/, done);
    });

  });
  
  xdescribe('Priviledged Access', () => {
    test('Redirects to sign in page when not logged in', () => {
      superReq
        .get('/logged-in.html')
        .expect(302)
        .expect((res) => {
          expect(res.headers.location).to.equal('/');
        })
        .end(done);
    });
    
    test('should return the content of logged-in.html when logged in', (done) => {
      // TODO log in this session
      superReq
        .get('/logged-in.html')
        .expect(200, /<div id="appLoggedIn"/, done);
    });
    
  });

  xdescribe('Account Creation', () => {
    test('signup creates a new user record', (done) => {
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

  xdescribe('Buy Passes Search', () => {
    test('should send all for_sale_blocks (excluding logged-in user) on blank search', (done) => {
      
    });
    test('should handle POST request with search queries', (done) => {
      
    });
  });
});
