var model = require('../static/model.js');
var _ = require('underscore');

var server = function() {
  this.time = 0;
  this.time_window = 200;
  this.moves = [];

  this.game = new model.game();
  this.game.default_init();
}

module.exports = {
  server: server,
}
