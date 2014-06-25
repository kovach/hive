var init_ws = function(open_callback, handler, disconnect_callback) {
  var ws = new WebSocket('ws://cutfree.net:3000/hive');

  ws.onopen = function() {
    console.log('ws open!');
    open_callback(ws);
  };
  ws.onmessage = function(message) {
    var msg = JSON.parse(message.data);
    handler(msg);
  };

  ws.onclose = function() {
    disconnect_callback();
  };

  return ws;
}

module.exports = {
  init_ws: init_ws
}
