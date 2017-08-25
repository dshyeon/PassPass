var request = require('supertest');
var mysql = require('mysql');
var stripe = require('stripe');
var expect = require('expect');

describe('Server Unit Tests', function () {
  var server;
  beforeEach(function () {
    server = require('./../../server/index.js');
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('new customer signup pathway is successful', function testSlash(done) {
    request(server)
      .post('/auth/signup')
      .expect(200, done)
  });
  //this test still broken
  it('newmerchant pathway is successful', function testSlash(done){
    request(server)
      .post('/pass/new')
      .send({
        type: 'custom',
        country: 'US',
        email: 'yahoo@hdfkje.com'
      })
      .expect(200, done)
  })
});
