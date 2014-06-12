var _ = require('underscore');
var WebSocket = require('ws');

var i = require('./input');
var dom = require('./dom');
var $ = dom.get;

colors = ['#f00', '#00f', '#3c3', '#f90', '#0c0',
       '#909', '#fff', '#669',];
id = undefined;

var tables = {};

var init_socket = function(callback) {
  var ws = new WebSocket('ws://cutfree.net:3000/hive');

  console.log(ws);
  ws.onopen = function() {
    console.log('open!');

    callback(ws);
  };
  ws.onmessage = function(message) {
    console.log('message: ', message.data);
    var msg = JSON.parse(message.data);
    switch (msg.type) {
      case 'init':
        id = msg.id;
        break;
      case 'msg':
        send('box', msg);
        break;
    }
  };

  ws.onclose = function() {
    // Disconnection
    dom.mk_text($('main'), 'YOU HAVE DISCONNECTED. PLEASE REFRESH', '#f00');
  };

  return ws;
}

var send = function(name, msg) {
  var obj = tables[name];
  if (obj) {
    obj.handle(msg);
  }
}

var to_msg = function(char) {
  return {type: 'msg', val: char, id: id};
}

var to_color = function(id) {
  return colors[id % colors.length];
}

var box_handle_msg = function(box) {
  return function(msg) {
    var char = msg.val;
    var color = to_color(msg.id);
    switch(char) {
      case 'LEFT':
        var s = dom.mk_text(box, symbols.left, color);
        break;
      case 'UP':
        var s = dom.mk_text(box, symbols.up, color);
        break;
      case 'RIGHT':
        var s = dom.mk_text(box, symbols.right, color);
        break;
      case 'DOWN':
        var s = dom.mk_text(box, symbols.down, color);
        break;
      case 'BACKSPACE':
        var s = dom.mk_text(box, symbols.back, color);
        break;
      case 'ESCAPE':
        var s = dom.mk_text(box, symbols.esc, color);
        break;
      case 'RETURN':
        var s = dom.mk_text(box, symbols.ret, color);
        break;
      case 'CTRL':
        var s = dom.mk_text(box, symbols.ctrl, color);
        break;
      case 'ALT':
        var s = dom.mk_text(box, symbols.alt, color);
        break;
      case 'TAB':
        var s = dom.mk_text(box, symbols.tab, color);
        break;
      case 'SHIFT':
        // too noisy
        break;
      default:
        var s = dom.mk_text(box, char, color);
        break;
    }
  }
}

var tc = String.fromCharCode
var symbols = {
  left: tc(0x2190),
  up: tc(0x2191),
  right: tc(0x2192),
  down: tc(0x2193),

  back: tc(0x21B6),
  ret: tc(0x21B5),
  esc: tc(0x21B8),

  ctrl: tc(0x2303),
  shift: tc(0x21E7),
  alt: tc(0x2325),
  tab: tc(0x21E5),
}

var init_ui = function() {
  var id = _.uniqueId();
  var box = dom.mk_div($('main'), 'box', id);

  // Help Text
  dom.mk_text($('main'), 'click the box and type', '#fff');

  tables['box'] = {handle: box_handle_msg(box)};

  var mk_handler = function(ws) {

    var handler = function(char) {
      send('box', to_msg(char));
      ws.send(JSON.stringify(to_msg(char)));
    }

    var debug = true;
    i.add_key_handler(box, handler, debug);
  }

  return init_socket(mk_handler);
}

module.exports = {
  init_socket: init_socket,
  init_ui: init_ui,
}
