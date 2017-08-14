var mysql      = require('mysql');

module.exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pass_database'
});

module.exports.connection.connect(
  function (err) {
    if (err) { console.log(err)
  } else {
    console.log('DATABASE CONNECTED')
  }
});

module.exports.findUser = function(user, callback) {
  var values = [user];
  module.exports.connection.query('SELECT * FROM USERS WHERE email= ?', values, (error, results, fields) => {
      if (error) {
        console.log('*********** database find user by email error ', error);
        callback(null, error);
      }
      if (results.length > 0) {
        callback(results);
      } else {
        console.log('*********** database find user by email success but no match ', results);
        callback(results);
      }
    }
  );
};

module.exports.authUser = function(user, callback) {
  var values = [user.email, user.password + user.salt];
  module.exports.connection.query('SELECT * FROM USERS WHERE email= ? AND password=SHA2( ? , 0)',
    values, function (error, results, fields) {
      if (error) {
        console.log('*********** database authenicate user email error ', error);
        throw error;
        callback(null, error);
      }
      if (results.length > 0) {
        callback(results);
      } else {
        console.log('*********** database authenicate user email success but no match ', results);
        callback(results);
      }
    }
  );
};

module.exports.addUserToSession = function(user, session, callback) {
  var values = [Number(user), session];
  module.exports.connection.query('UPDATE SESSIONS SET user_id= ? WHERE session_id= ? ',
    values, function (error, results, fields) {
      if (error) {
        console.log('*********** database add user to session error ', error);
        throw error;
        callback(error);
      }
      if (results) {
        callback(null, results);
      }
    }
  );
};

// connection.end();

var getForSaleBlocks = function(ignoreUserEmail, callback) {
  connection.query('SELECT * FROM users, for_sale_block WHERE users.id = for_sale_block.seller_id AND users.email <> "' + ignoreUserEmail + '"', function(error, results, fields) {
    if (error) {
      throw error;
    }
    callback(null, results);
  });
};

module.exports = {
  getForSaleBlocks: getForSaleBlocks,
  connection: connection
}

