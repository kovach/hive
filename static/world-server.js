var WSS = require('ws').Server
  , http = require('http')
  , express = require('express')
  ;

var _ = require('underscore');

var fs = require('fs');

var log = function(str) {
  fs.appendFile('log.txt', str+'\n');
}

var clients = [];

var init_server = function() {
  var app = express();
  app.use(express.static('static'));
  var server = http.createServer(app);
  server.listen(3333);

  var wss = new WSS({server: server});

  wss.on('connection', function(ws) {
    var id = _.uniqueId();

    console.log('connection: ', id);
    clients[id] = ws;

    ws.on('message', function(message) {
      var msg = JSON.parse(message);
      msg.id = id;
      // Process
      switch (msg.type) {
        case 'msg':
          console.log('processing from ', id);
          _.each(clients, function(ws, index) {
            if (index+'' !== id+'') {
              console.log('not equal: ', id, index);
              ws.send(message);
            }
          });
          break;
      }
      // Log
      msg.time = new Date().getTime();
      console.log('message: ', msg);
      log(JSON.stringify(msg));
    });

    ws.on('close', function() {
      // Remove client
      console.log('closing: ', id);
      delete clients[id];
      console.log('clients: ', _.keys(clients));
    });

    var init_m = JSON.stringify({type: 'init', id: id});
    ws.send(init_m);
  });
}

init_server();
