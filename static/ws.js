var WSS = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  ;

var server = app.use(express.static('static'));
http.createServer(app).listen(2000);
var wss = new WSS({server: server});

//wss.on('connection', function() {
//  ws.send('hi there');
//});

wss.on('message', function(data, flags) {
  console.log('data: ', data);
  console.log('flags: ', flags);
});
