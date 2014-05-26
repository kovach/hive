console.log('HELLO!!');
var WebSocket = require('ws');
var ws = new WebSocket('ws://cutfree.net/hive');
ws.on('open', function() {
  console.log('open');
  ws.send('hi there');
});
