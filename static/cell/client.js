var _ = require('underscore');
var WebSocket = require('ws');

var wsc = require ('../ws-client');

var input = require('../input');
var dom = require('../dom');

var ev = require('./event');
var log = require('./log');
var objects = require('./objects');

var edit = require('../edit/box');


var id = undefined;

var ws_msg_handler = function(msg) {
  switch (msg.type) {
    case 'init':
      id = msg.id;
      break;
    case 'key':
      // TODO
      break;
  }
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

var mk_cell = function(obj_log) {
  var l = new log.log();
  var box = objects.mk_accumulator(l);
  var ref = obj_log.add(box);
  return box;
}

var key_hook = function(msg, key_obj) {
  console.log(msg);
}

var init_ui = function() {
  var dom_main = dom.get('main');
  dom_main.setAttribute('tabindex', 1);

  var obj_log = new log.log();

  var key_box = mk_cell(obj_log);
  var ws_in_box = mk_cell(obj_log);
  var ws_out_box = mk_cell(obj_log);
  var null_box = mk_cell(obj_log);

  var visual_box = new edit.box_ui();

  key_box.add(ev.hook(function(msg) {
    console.log('key-box: ', msg);
    ev.send(msg, ws_out_box);
  }, null_box));

  ws_in_box.add(ev.hook(function(msg) {
    console.log('received: ', msg);
  }, null_box));

  // Capture messages from keyboard
  var client_key_handler = function(char) {
    ev.send([char], key_box);
  }
  // Capture messages from server
  var client_ws_handler = function(msg) {
    ev.send(msg, ws_in_box);
  }
  // Capture disconnect message
  var ws_close_handler = function() {
    dom.app(dom_main,
        dom.mk_text('YOU HAVE DISCONNECTED. PLEASE REFRESH',
          '#f00'));
  }
  // Hook ws_out event object to ws
  var open_callback = function(ws) {
    var ws_obj = {};
    ws_obj.handler = function(msg, ws_obj) {
      ws.send(JSON.stringify(msg));
    }
    var hook = ev.hook(objects.id_hook, ws_obj);
    ws_out_box.add(hook);
  }

  var debug = false;
  input.add_key_handler(dom_main, client_key_handler, debug);

  // Open socket
  return wsc.init_ws(
      open_callback,
      client_ws_handler,
      ws_close_handler);
}

module.exports = {
  init_ui: init_ui,
}
