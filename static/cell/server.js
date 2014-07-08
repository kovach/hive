var ws = require('ws');
var http = require('http');
var express = require('express');

var _ = require('underscore');

var fs = require('fs');

var log = function(str) {
  fs.appendFile('cell-log.txt', str+'\n');
}

var clients = [];

var init_server = function() {
  var app = express();
  app.use(express.static('static'));
  var server = http.createServer(app);
  server.listen(3000);

  var wss = new ws.Server({server: server});

  wss.on('connection', function(ws) {
    var id = _.uniqueId();
    clients[id] = ws;

    console.log('connection: ', id);
    console.log('clients: ', _.keys(clients));

    ws.on('message', function(message) {
      // Verify message
      var msg = JSON.parse(message);
      msg = {val: msg};
      msg.time = new Date().getTime();
      msg.id = id;
      message = JSON.stringify(msg);

      console.log('processing from ', id);
      console.log('message: ', message);
      log(message);

      _.each(clients, function(ws, index) {
        ws.send(message);
      });
    });

    ws.on('close', function() {
      // Remove client
      console.log('closing: ', id);
      delete clients[id];
    });

  });
}

init_server();
