var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set default view engine to ejs
app.set('view engine', 'ejs');

// connect to database
mongoose.connect('mongodb://localhost/test');

// create database schema
var studentInformation = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String
});

// create model
var Student = mongoose.model('Student', studentInformation);

// handle get request for the default landing page
app.get('/', function(req, res) {
  Student.find({}, function (err, data) {
    if (err) {
      throw err;
    }
    res.render('view', {data: data});
  });
});

// handle post request to populate insert page
app.get('/insert', function(req, res) {
  res.render('insert');
});

// handle post request for insert
app.post('/insert', urlencodedParser, function(req, res) {
  var newStudent = Student(req.body).save(function (err, data) {
    if (err) {
      throw err;
    }
    res.json({
      status: 'Success'
    });
  });
});

// // handle delete request
// app.delete('/del/:item', function(req, res) {
//   data = data.filter(function (item) {
//     return item.message !== req.params.item;
//   });
//   res.send(data);
// });

// set listen port
app.listen(3000);