var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set default view engine to ejs
app.set('view engine', 'ejs');

var data = [];

// handle get request for the default landing page
app.get('/', function(req, res) {
  res.render('index', {data: data});
});

// handle post request for insert
app.post('/insert', urlencodedParser, function(req, res) {
  data.push(req.body);
  res.send(data);
});

// handle delete request
app.delete('/del/:item', function(req, res) {
  data = data.filter(function (item) {
    return item.message !== req.params.item;
  });
  res.send(data);
});

// set listen port
app.listen(3000);