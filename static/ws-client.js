var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000/hive');
console.log(ws);
console.log(ws.on);
ws.onopen = function() {
  console.log('open!');
  ws.send('hi, from client');
};
ws.onmessage = function(message) {
  console.log('message: ', message);
  console.log(ws);
};
