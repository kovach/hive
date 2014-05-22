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
  g.delete_form = c.obj({
    head: c.eq('delete'),
  });

  g.move_forms = [g.move_form, g.delete_form];

  g.id = function() {
    return g.current_id++;
  }

  g.default_init = function() {
    g.objects = _.map([-1,0,1], function(i) {
      return {id: g.id(), x: i * 2, y: 0};
    });
  }
  g.init_world = function(things, world) {
    g.objects = things;
    world.init_world(things);
  }

  g.look = function(id) {
    return _.find(g.objects, function(obj) {
      return obj.id === id;
    });
  }
  g.update = function(msgs) {
    var result = [];
    _.each(msgs, function(msg) {
      var match = c.check_forms(g.move_forms, msg);
      if (match !== undefined) {
        result.push(msg);

        console.log('good msg: ', msg);

        switch (msg.head) {
          case 'move':
            var obj = g.look(msg.id);
            console.log('found', obj);
            if (obj !== undefined) {
              obj.x += msg.x;
              obj.y += msg.y;

              if (obj.update) {
                obj.update();
              }
              console.log(obj);
            }
            break;
        }
      } else {
        console.log('bad move: ', msg);
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
