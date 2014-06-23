var _ = require('underscore');
var p = require('./parsing.js');
var u = require('./util.js');

var names = require('./types.js');

var set = function(name, val) {
  return {head: names.set, name: name, val: val};
}
var match = function(head, obj) {
  return (_.isObject(obj) && obj.head === head);
}
var table = function(mvals) {
  this.val = [];
  if (mvals !== undefined) {
    this.adds(mvals);
  }
}
table.prototype = {
  add: function(val) {
    return this.adds([val]);
  },
  adds: function(vals) {
    this.val = this.val.concat(vals);
    return this.val.length - 1;
  },
  list: function() {
    return this.val;
  },
  look: function(id) {
    return this.val[id];
  },
  length: function() {
    return this.val.length;
  },
  read: function(name) {
    for(var i = this.val.length - 1; i >= 0; i--) {
      var o = this.look(i);
      if (match(names.set, o) && o.name === name) {
        return just(o.val);
      }
    }
    return nothing();
  },
  set: function(name, val) {
    this.add(set(name, val));
  },
}

var cell = function(id, val) {
  this.id = id;
  this.val = val;
}

var hook = function(table, s, t) {
  this.source = s;
  this.target = t;
  this.hook_table = table;

  this.table = new table();
  this.table.set(names.cursor, 0);
}
hook.prototype = {
  slice: function(t) {
    var l = t.list();
    return l.slice(this.cursor, l.length);
  },
  update: function(delta) {
    return this.table.set(names.cursor, this.table.read(names.cursor).val + delta);
  },
  add: function(val) {
    return this.table.add(val);
  },
  look: function(id) {
    return this.table.look(id);
  },
  // TODO
  parse: function(vals, source, target) {
    var string = this.slice(source);
    p.parse_string(string, this.hook_table);
  },
}

// Optimization
var box = function() {
  this.table = new table();
  this.hooks = new table();
}
box.prototype = {
  hook: function(hook) {
    this.hooks.add(hook);
  },
}

var context = function() {
  this.table = new table();
}
context.prototype = {
  suppose: function(id, vals) {
    var world = this;
    var source = world.table.look(id);
    var result = [];
    result.push(new cell(id, vals));
    _.each(source.hooks.list(), function(hook_id) {
      var hook_obj = this.look(hook_id);
      var t = hook_obj.target;
      var target = this.table.look(t);
      var output_tuple = hook_obj.parse(vals, source.table, target.table);
      result =
        result.concat(new cell(hook_id, tuple.hook))
      result = 
        result.concat(world.suppose(t, tuple.output));
    });

    return result;
  },
  run: function(id, vals) {
    var mapping = this.suppose(id, vals);
    _.each(mapping, function(change) {
      var id = change.id;
      var vals = change.vals;

      var obj = this.table.look(id);
      obj.adds(vals);
    });
  },
  add: function(val) {
    return this.table.add(val);
  },
  look: function(id) {
    return this.table.look(id);
  },

  add_box: function(box) {
    return this.add(box);
  },
  add_hook: function(id, s, t) {
    var hook_table = this.look(id);
    var hook_obj = new hook(hook_table, s, t);
    var hook_ref = this.add(hook_obj);

    this.look(s).hook(hook_ref);
    return hook_ref;
  },
}

// Turns a string into a parser table
// '_' is special symbol for hole
var pre_parser = function(pre_string, post_fn) {
  var row = new table();
  var pre_t = new table();
  var post_t = new table();

  var pre = _.map(pre_string, function(char) {
    if (char === '_') {
      return {head: names.hole};
    } else {
      return {head: names.match, val: char};
    }
  });
  pre_t.adds(pre);

  //var post = _.map(post_string, function(char) {
  //  return u.m_maybe(u.is_digit(char), {
  //    nothing: function() {
  //      return {head: names.match, val: char};
  //    },
  //    just: function(val) {
  //      return {head: names.ref, val: char};
  //    }
  //  });
  //});
  //post_t.adds(post);

  row.add(pre_t);
  row.add(post_fn);

  return row;
}
var str_fn = function(post_string) {
  return function() {
    return post_string;
  }
}

module.exports = {
  table: table,
  hook: hook,
  box: box,
  context: context,

  pre_parser: pre_parser,
  str_fn: str_fn,

}
