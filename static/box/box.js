var _ = require('underscore');
var p = require('./parsing.js');

// stuff
var names = {
  cursor: 'cursor',
  nothing: 'nothing',
  just: 'just',
  set: 'set',
  match: 'match',
  hole: '_',
  seq: 'seq',
}

var nothing = function() {
  return {head: names.nothing};
}
var just = function(x) {
  return {head: names.just, val: x};
}
var set = function(name, val) {
  return {head: names.set, name: name, val: val};
}
var match = function(head, obj) {
  return (_.isObject(obj) && obj.head === head);
}
var mk = function(head) {
  return {head: head};
}

var table = function() {
  this.val = [];
}
table.prototype = {
  add: function(val) {
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

var hook = function(id, s, t) {
  this.source = s;
  this.target = t;
  this.type_id = id;

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
  match: function(string, pattern) {
    switch (pattern.head) {
      case names.match:
        return util.prefix(string, pattern);
        break;
      case names.hole:
        if (string.length > 0) {
          return {val: string[0], len: 1};
        } else {
          return {val: "", len: 0};
        }
        break;
      case names.seq:
        break;
  },
  // TODO
  parse: function(vals, source, target) {
    var string = this.slice(source);

    var matcher = _.find(this.table, function(parser) {
      // try to match table against string
    });
    // var result = apply(matcher, string);
    return result;
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
      var hook = this.look(hook_id);
      var hook_spec = this.look(hook.type_id);
      var t = hook.target;
      var target = this.table.look(t);
      var output_tuple = hook_spec.parse(vals, source.table, target.table);
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
  }

  add_box: function(box) {
    return this.add(box);
  },
  add_hook: function(id, s, t) {
    var hook = new hook(id, s, t);
    var hook_ref = this.add(hook);

    this.look(s).hook(hook_ref);
    return hook_ref;
  },
}

module.exports = {
  table: table,
  hook: hook,
  box: box,
  context: context,
}
