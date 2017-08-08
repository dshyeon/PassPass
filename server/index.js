var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database');

var app = express();

// app.use(express.static(__dirName + '/../react-client/dist'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
