var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var database = require('../database');
var session = require('express-session');

var app = express();

var headers = {'Content-Type', 'application/json'};

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({extended: false})); //will work when the req header Content-Type matches the type option (accepts only UTF-8 ), extended=false means the obj will contain key-value paires and values can be strings or arrays, change to true for any type
app.use(bodyParser.json()); //default strict parameter only accepts arrays and objects, can change to false, will work when the req header Content-Type matches the type option (default to application/json but can change)

app.use(session({secret: 'hungry hippos'})); // optional parameter for signed authentication {secret: 'hungry hippos'}
//when to destroy a session?
//req.session.destroy(err => {})

app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    //update name of method to database to find matching username
    database.authUser({email: username, password: password},
    (err, user) => {
      if (err) {return done(err);}
      if (!user) {return done(null, false, {message: 'Incorrect username or password.'});}
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy(FB_CREDS,
    (accessToken, refreshToken, profile, done) => { //fb profile: http://passportjs.org/docs/profile
      database.createUser({email: profile.emails[0].value, name: profile.displayName, cookie: accessToken},
      (err, user) => {
        if (err) {return done(err);}
        done(null, user);
      });
    }
));

app.get('/', (req, res, next) => {
  var sesssionID = req.sessionID;
  var cookie = req.session.cookie;
  req.session.cookie.expires = false;
  req.session.hash = 'some value';
  //create a session and check a cookie
  req.login(); //establishes a session for passport to work
  res.end();
});

app.post('/auth/email', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    //info is optional argument passed by the strategy's callback
    //req.user contains the authenticated user if approved
    //req.user = false if fails
    //if exists, update cookie
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      req.session.save(err => {
        console.log('save session before redirect ', err);
      })
      return res.redirect('/interactions/' + user.username);
    });
  })(req, res, next);
});

app.post('/auth/signup', (req, res) => {
  //req has obj of signup data
  //call to db to add the user data and create new user
  //if successful, return insert id
  //log user in
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
  res.end(JSON.stringify(req.body, null, 2));
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

app.set('port', 3000);
// app.set('port', process.env.PORT);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
