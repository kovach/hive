var p = require('../parse/parse.js');
var pmk = require('../parse/util.js');
var ev = require('./event.js');

var i = require('../input.js');

var mk_accumulator = function(log) {
  var handler = function(obj, msg) {
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

module.exports = {
  mk_accumulator: mk_accumulator,
  id_hook: id_hook,
}
