var log = require('./log');
var objects = require('./objects');

var init_model = function() {
  var obj_log = new log.log();

  var cell = function() {
    return objects.mk_cell(obj_log);
  }


  var doc_box = cell();


  return obj_log;
}

module.exports = {
  init_model: init_model,
}
