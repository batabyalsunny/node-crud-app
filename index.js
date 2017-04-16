var express = require('express');
var app = express();

// set default view engine to ejs
app.set('view engine', 'ejs');

// handle get request for the landing page
app.get('/', function(req, res) {
  res.render('index');
});

// set listen port
app.listen(3000);