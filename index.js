var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set default view engine to ejs
app.set('view engine', 'ejs');

var data = [];

// handle get request for the default landing page
app.get('/', function(req, res) {
  res.render('index', {data: data});
});

// handle post request
app.post('/insert', urlencodedParser, function(req, res) {
  data.push(req.body);
  res.send(data);
});

// set listen port
app.listen(3000);