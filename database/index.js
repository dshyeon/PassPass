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

module.exports.getForSaleBlocks = function(searchQueries, callback) {
  var queryString = 'SELECT users.email, users.first_name, ' + 
                      'users.rating, for_sale_block.pass_volume, for_sale_block.passes_sold, ' +
                      'for_sale_block.current_price, for_sale_block.period_start, ' +
                      'for_sale_block.period_end, A.studios FROM users ' + 
                    'INNER JOIN for_sale_block ON users.id = for_sale_block.seller_id ' +
                    'LEFT JOIN ' +
                      '(SELECT restricted_studios.block_id, ' +
                        'GROUP_CONCAT(restricted_list.studio SEPARATOR ",") AS studios FROM restricted_studios ' +
                      'INNER JOIN restricted_list ON restricted_studios.exempt_studio_id=restricted_list.id ' +
                      'GROUP BY restricted_studios.block_id) A ' +
                    'ON for_sale_block.id=A.block_id ' +
                    'WHERE users.id <> ' + searchQueries.ignoreUserId;
  for (var key in searchQueries) {
    if (key === 'priceInput' && searchQueries[key]) {
      queryString += ' AND for_sale_block.current_price < ' + searchQueries[key];
    } else if (key === 'dateRange' && searchQueries[key]) {
      var dates = searchQueries[key];
      var startDate = dates[0];
      var endDate = dates[1];
      queryString += ' AND ((for_sale_block.period_start between "' + startDate + '" and "' + endDate + '") OR (for_sale_block.period_end between "' + startDate + '" and "' + endDate + '"))';
    } else if (key === 'passesCountInput' && searchQueries[key]) {
      queryString += ' AND for_sale_block.pass_volume - for_sale_block.passes_sold >= ' + searchQueries[key];
    } else if (key === 'gymInput' && searchQueries[key] && searchQueries[key].toLowerCase() !== 'none') {
      queryString += ' AND studios NOT LIKE "%' + searchQueries[key] + '%"';
    }
  }
  module.exports.connection.query(queryString, function(error, results, fields) {
    callback(error, results);

  });
};

// var queryString = 'SELECT users.email, users.first_name, users.rating, ' + 
//                       'for_sale_block.pass_volume, for_sale_block.passes_sold, ' +
//                       'for_sale_block.current_price, for_sale_block.period_start, ' +
//                       'for_sale_block.period_end, restricted_list.studio FROM users ' +
//                     'INNER JOIN for_sale_block on users.id = for_sale_block.seller_id ' +
//                     'LEFT JOIN restricted_studios on restricted_studios.block_id = for_sale_block.id ' +
//                     'LEFT JOIN restricted_list on restricted_studios.exempt_studio_id = restricted_list.id ' +
//                     'WHERE users.id <> ' + searchQueries.ignoreUserId;

