var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

// connect to database
mongoose.connect('mongodb://localhost/test');

// create database schema
var testSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// create model
var TestModel = mongoose.model('TestModel', testSchema);

// insert item
var dbItem = TestModel({
  name: 'Sunny',
  age: 23
});

dbItem.save(function (err) {
  if (err) {
    throw err;
  }
  console.log('Item Saved');
})

// set listen port
app.listen(3000);