if(typeof exports !== 'undefined'){
  var _ = require('underscore');
  var c = require('../static/types').checker;
}

game = function() {
  var g = this;
  g.current_id = 0;

  g.move_form = c.obj({
    head: c.eq('move'),
    x: c.type(0), y: c.type(0),
    id: c.any()
  });

  g.id = function() {
    return g.current_id++;
  }
  g.objects = _.map([-1,0,1], function(i) {
    return {id: g.id(), x: i * 2, y: 0};
  });

  g.look = function(id) {
    _.each(g.objects, function(obj) {
      if (obj.id === id) {
        return obj;
      }
    });
    return undefined;
  }
  g.update = function(msgs) {
    var result = [];
    console.log('msgs: ', msgs);
    _.each(msgs, function(msg) {
      if (c.check(g.move_form, msg)) {
        result.push(msg);
      }
      console.log('msg: ', msg);
      switch (msg.head) {
        case 'move':
          var obj = g.look(msg.id);
          if (obj) {
            obj.x += msg.x;
            obj.y += msg.y;
          }
          break;
      }
    });

    // TODO validate them first!!
    return result;
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    game: game,
  }
}
