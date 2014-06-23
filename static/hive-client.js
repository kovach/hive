var _ = require('underscore');
var WebSocket = require('ws');

var wsc = require ('./ws-client');

var i = require('./input');
var dom = require('./dom');

var wu = require('./web/util.js');
var b = require ('./web/box.js');

var colors = ['#f00', '#00f', '#3c3', '#f90', '#0c0',
              '#909', '#fff', '#669'];
var id = undefined;

var tables = {};

var ws_msg_handler = function(msg) {
  switch (msg.type) {
    case 'init':
      id = msg.id;
      break;
    case 'msg':
      send('box', msg);
      break;
  }
}
var ws_close_handler = function() {
    dom.app(dom.get('main'), dom.mk_text('YOU HAVE DISCONNECTED. PLEASE REFRESH', '#f00'));
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
    var str = wu.to_string(char);
    if (str !== undefined) {
      dom.app(box, dom.mk_text(str, color));
    }
  }
}

var init_ui = function() {
  var id = _.uniqueId();
  var main = dom.get('main');
  var box = dom.app(main, dom.mk_div('box', id));

  var edit = new b.box_ui(main);
  _.each("", function(char) {
    edit.add_char(char);
  });

  // Help Text
  //dom.app(main, dom.mk_text('click the box and type', '#fff'));

  tables['box'] = {handle: box_handle_msg(box)};

  var mk_handler = function(ws) {
    var handler = function(char) {
      var msg = to_msg(char);
      //send('box', msg);
      box_handle_msg(box)(msg);
      edit.handle_char(msg.val);
      ws.send(JSON.stringify(msg));
    }

    var debug = true;
    i.add_key_handler(box, handler, debug);
  }

  return wsc.init_ws(mk_handler, ws_msg_handler, ws_close_handler);
}

module.exports = {
  init_ui: init_ui,
}
