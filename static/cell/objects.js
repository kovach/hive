var ev = require('./event.js');
var log = require('./log');

var i = require('../input.js');

var mk_accumulator = function(log) {
  var handler = function(msg, obj) {
    obj.log.adds(msg);
  }
  var init = function(obj) {
    obj.log = log;
  }
  return new ev.object(handler, init);
}

var mk_cell = function(obj_log) {
  var l = new log.log();
  var box = mk_accumulator(l);
  var ref = obj_log.add(box);
  return box;
}

var id_hook = function(msg) {
  return msg;
}

var edit_hook = function(msg, state) {
  switch (state.mode) {
    case 'edit':
      break;
    case 'ctrl':
      break;
  }
}

module.exports = {
  mk_cell: mk_cell,
  id_hook: id_hook,
}
