var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var database = require('../database/index.js');
var session = require('express-session');
var SessionStore = require('express-mysql-session')(session);
var fb = require('../facebook.config.js');
var session_secret = require('../session.config.js');
var cryptoRandomString = require('crypto-random-string');

var app = express();
var sessionStore = new SessionStore({}, database.connection);

var headers = {'Content-Type': 'application/json'};

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({extended: false})); //will work when the req header Content-Type matches the type option (accepts only UTF-8 ), extended=false means the obj will contain key-value paires and values can be strings or arrays, change to true for any type
app.use(bodyParser.json()); //default strict parameter only accepts arrays and objects, can change to false, will work when the req header Content-Type matches the type option (default to application/json but can change)

app.use(session({
  secret: session_secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
// session created on access, added to the DB,
// on authenication, user added to the session and cookie added to the req header

app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    database.findUser(username, (user, err) => {
      if (err) {
        console.log('************ server side in strategy - email lookup error ', err);
        return done(err);
      } else if (user.length === 0) {
        console.log('********** success on user email lookup in strategy -  but no user match ', user);
        return done(null, false, {message: 'Incorrect username. Please try again or signup for a new account.'});
      } else {
        database.authUser({email: username, password: password, salt: user[0].salt}, (user, err) => {
          if (err) {
            console.log('************ server side in strategy - password check login error ', err);
            return done(err);
          } else if (user.length === 0) {
            console.log('********** success on user password check in strategy -  but no password match ', user);
            return done(null, false, {message: 'Incorrect password. Please try again or signup for a new account.'});
          } else {
            return done(null, user);
          }
        });
      }
    });
  }
));

passport.use(new FacebookStrategy(fb,
    (accessToken, refreshToken, profile, done) => { //fb profile: http://passportjs.org/docs/profile
      database.createUser({email: profile.emails[0].value, name: profile.displayName, cookie: accessToken},
      (err, user) => {
        if (err) {return done(err);}
        done(null, user);
      });
    }
));

app.post('/auth/email', (req, res, next) => {
  var rememberMe = req.body.rememberMe;
  passport.authenticate('local', (err, user, info) => { //info is optional argument passed by the strategy's callback
    //req.user contains the authenticated user if approved
    //req.user = false if fails
    //if exists, update cookie
      // var cookie = req.cookies['connect.sid'];
    if (err) {
      console.log('************ server side in post - email login error ', err);
      return next(err);
    } else if (!user) {
      console.log('********** success on user login in post -  but no user match ', user);
      console.log('********** success on user login in post -  see info ', info);
      return res.redirect('/login');
    } else {
      req.session.user = user;
      req.session.loggedIn = true;
      if (rememberMe) { // add this to user signup too
        req.session.cookie.maxAge = (30*24*60*60*1000); // 30 days
      } else {
        req.session.cookie.expires = false;
      }
      database.addUserToSession(user[0].id, req.sessionID, (err, results) => {
        if (err) {
          console.log('************ server side add user to session error ', err);
          return next(err);
        } else {
          res.send(user);
          // res.end()
        }
      });
    }
  })(req, res, next);
});

app.post('/auth/signup', (req, res) => {
  var salt = cryptoRandomString(10); //use this salt to create a new user
  //req has obj of signup data
  //call to db to add the user data and create new user
  //if successful, return insert id
  //log user in
  req.logIn() //used to auto login after signing up
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //add authentication to a session table and cookie to the browser
  return res.redirect('/interactions/' + user.username);
  //else send error message try again
  //how granular can the error be?
  //if existing account, just login?
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirects: '/interactions',
  failureRedirect: '/login'
}));

app.post('/user/search', (req, res) => {
  // req has user id
  // call to db for user profile data based on id
  //if successful, return record
  //else send error message try again
  //how granular can the error be?
  res.send(JSON.stringify(req.body, null, 2));
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
  var startDate = req.body.searchQueries.startDateInput || '0000-00-00';
  var endDate = req.body.searchQueries.endDateInput || '9999-99-99';
  req.body.searchQueries.dateRange = startDate + ',' + endDate;
  database.getForSaleBlocks(req.body.searchQueries, function(error, forSaleBlocks) {
    res.send(JSON.stringify(forSaleBlocks));
  });
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

app.set('port', 3000);
// app.set('port', process.env.PORT);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
