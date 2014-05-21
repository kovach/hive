// TODO handle posts without requiring express library
var http = require("http");
//var connect = require("connect");
var express = require('express');

var fs = require('fs');

var _ = require('underscore');
//eval(fs.readFileSync('static/init_world.js')+'');

var app = express()
  .use(express.static('static'))
  .post('/init', function(req, res) {
    console.log('/init');
    res.send(JSON.stringify({}));
  })
  .post('/req', function(req, res) {
    var ts = req.query.ts;
    console.log('ts: ', ts);
  })
  .post('/send', function(req, res) {
    console.log('/send');
    var data = JSON.parse(req.query.data);
    if (data) { 
      console.log('data: ', data);
      _.each(data, function(entry, ind) {
      });
      res.send('here is some data...');
    }
  })
  ;
var debug = false;
if (!debug) {
  http.createServer(app).listen(3000); 
} else {
}
