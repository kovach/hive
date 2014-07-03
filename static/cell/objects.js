var p = require('../parse/parse.js');
var pmk = require('../parse/util.js');
var ev = require('./event.js');
var str = require('../edit/util.js');

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
  mk_accumulator: mk_accumulator,
  id_hook: id_hook,
}
