var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const items = require('../database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
