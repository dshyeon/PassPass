var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pass_database'
});

connection.connect(
  function (err) {
    if (err) { console.log(err)
  }else{
    console.log('DATABASE CONNECTED')
  }
});

//need to wrap any queries in a variable with a callback function to return the results
//and export them
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// connection.end();
module.exports.connection = connection;
