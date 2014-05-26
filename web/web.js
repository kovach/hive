// TODO handle posts without requiring express library
var http = require("http");
var express = require('express');

var _ = require('underscore');
var S = require('../static/server.js');

var server = new S.server();

var app = express()
  .use(express.static('static'))
  .post('/init', function(req, res) {
    console.log('/init');
    var msg = {objects: server.game.objects};
    var data = JSON.stringify(msg);
    res.send(data);
  })
  .post('/req', function(req, res) {
    var ts = req.query.ts;
    console.log('ts: ', ts);
  })
  .post('/send', function(req, res) {
    console.log('/send');
    var msg = JSON.parse(req.query.data);
    var client_time = msg.time;
    var moves = msg.moves;

    console.log('client time: ', client_time);
    console.log('moves: ', moves);

    var valid = server.game.update(moves);

    var response = {moves: valid, _id: msg._id};
    var data = JSON.stringify(response);
    res.send(data);
  })
  ;
var debug = false;
if (!debug) {
  http.createServer(app).listen(8000); 
} else {
}
