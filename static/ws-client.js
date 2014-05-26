console.log('HELLO!!');
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8888/hive');
ws.on('open', function() {
  console.log('open');
  ws.send('hi there');
});
