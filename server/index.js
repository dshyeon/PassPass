var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', (req, res) => {
  // res.send('Hello World and Martin');
  //create a session and check a cookie
  // res.writeHead(301, {Location: 'http://localhost:3000/react-client/dist/index.html' });
  // res.writeHead(301, {Location: 'http' + (req.socket.encrypted ? 's' : '') + '://' + req.headers.host + '/index.html'})
  // res.end();
});

app.post('/user/login', (req, res) => {
  //req has username and password
  //call to db to check the login and password
  //if exists, update authentication token
  //else send error message wrong login info
});

app.post('/user/signup', (req, res) => {
  //req has obj of signup data
  //call to db to add the user data and create new user
  //if successful, return insert id
  //else send error message try again
  //how granular can the error be?
  //if existing account, just login?
});

app.post('/user/search', (req, res) => {
  // req has user id
  // call to db for user profile data based on id
  //if successful, return record
  //else send error message try again
  //how granular can the error be?
});

app.post('/pass/new', (req, res) => {
  //req has obj of pass data and any new restricted studios
  //call to db to add the new pass data and create new for_sale_block
  // create new restricted studio if needed
  //if successful, return insert id
  //else send error message try again
  //how granular can the error be?
});

app.post('/pass/edit', (req, res) => {
  //req has obj of pass data and unique id and possible restricted studios
  //call to db to edit the pass data in for_sale_block table
  // create new restricted studio if needed
  //if successful, return insert id
  //else send error message try again
  //how granular can the error be?
});

app.post('/pass/buyer/search', (req, res) => {
  // for display to buyers - req obj has search values (volume, dates, price)
  // call to db for passes based on search values
  // if successful, return records
  // else send error message try again
  // how granular can the error be?
});

app.post('/pass/seller/search', (req, res) => {
  // for displaying all seller history of pass records - req obj has seller id
  // call to db for passes based on user id
  // if successful, return records
  // else send error message try again
  // how granular can the error be?
});

app.post('/pass/seller/clone', (req, res) => {
  // for creating a new record for seller off an old one (req obj has id)
  // call to db for one pass based on matching id
  // if successful, return records
  // else send error message try again
  // how granular can the error be?
});

app.post('/review/new', (req, res) => {
  //req has obj of review data
  //call to db to add a review
  // db should increment rating calc value
  //if successful, return insert id
  //else send error message try again
  //how granular can the error be?
});

app.post('/review/edit', (req, res) => {
  //req has review obj data
  //call to db to edit that review record with new data
  //if successful, return record id
  //else send error message try again
  //how granular can the error be?
});

app.post('/review/search', (req, res) => {
  //req has user id info
  //call to db to select all reviews with that user id
  //if successful, return review records
  //else send error message try again
  //how granular can the error be?
});

app.post('/chat', (req, res) => {
  //integrate with twilio API
  // TBD
});

app.listen(4000, function() {
  console.log('listening on port 3000');
});

// app.listen(process.env.PORT, function() {
//   console.log('listening on port ' + process.env.PORT);
// });
