var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database');

var app = express();

// app.use(express.static(__dirName + '/../react-client/dist'));

app.get('/', (req, res) => {
  res.send('Hello World and Martin');
});

app.listen(process.env.PORT, function() {
  console.log('listening on port ' + process.env.PORT);
});
