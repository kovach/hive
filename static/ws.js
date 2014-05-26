var WSS = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  ;

app.use(express.static('static'));
var server = http.createServer(app);
server.listen(2000);

var wss = new WSS({server: server});

//wss.on('connection', function() {
//  ws.send('hi there');
//});

console.log('foo');
wss.on('connection', function(ws) {
  console.log('connection!');
  ws.on('message', function(message) {
    console.log('received: ', message);
  });
  ws.send('hello from server');
});
