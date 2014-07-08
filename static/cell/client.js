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

var key_hook = function(msg, key_obj) {
  console.log(msg);
}

var init_ui = function() {
  var dom_main = dom.get('main');
  dom_main.setAttribute('tabindex', 1);

  var obj_log = new log.log();

  var cell = function() {
    return objects.mk_cell(obj_log);
  }

  // Box objects/hooks //
  var key_box = cell();
  var ws_in_box = cell();
  var ws_out_box = cell();
  var null_box = cell();

  var doc_box = cell();
  var visual_box = new edit.box_ui(dom_main);
  console.log(visual_box);

  key_box.add(ev.hook(function(msg) {
    console.log('key-box: ', msg);
    ev.send(msg, ws_out_box);
  }, null_box));

  ws_in_box.add(ev.hook(function(msg) {
    console.log('received: ', msg);
  }, null_box));

  //TODO should ws_in_box be receiving msg with timestamp/user id?
  ws_in_box.add(ev.hook(function(msg) {
    var val = msg.val;
    return val;
  }, doc_box));

  doc_box.add(ev.hook(function(msg) {
    return edit.char_msg(msg);
  }, visual_box));

  // Callback Functions //
  // Capture messages from keyboard
  var client_key_handler = function(char) {
    ev.send(char, key_box);
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
  // Capture messages from server
  var client_ws_handler = function(msg) {
    ev.send(msg, ws_in_box);
  }
  // Capture disconnect message
  var close_callback = function() {
    dom.app(dom_main,
        dom.mk_text('YOU HAVE DISCONNECTED. PLEASE REFRESH',
          '#f00'));
  }
  var debug = false;
  input.add_key_handler(dom_main, client_key_handler, debug);

  // Open socket
  return wsc.init_ws(
      open_callback,
      client_ws_handler,
      close_callback);
}

module.exports = {
  init_ui: init_ui,
}
