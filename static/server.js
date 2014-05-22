var game = require('../static/model.js');
var _ = require('underscore');

server = function() {
  this.time = 0;
  this.time_window = 200;
  this.moves = [];

  this.game = new game.game();
}

move = function(player, time, action) {
  this.player = player;
  this.time = time;
  this.action = action;
}

module.exports = {
  server: server,
  move: move
}
