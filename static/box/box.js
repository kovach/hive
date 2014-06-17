var _ = require('underscore');
var p = require('./box/parsing.js');

// stuff
var names = {
  cursor: 'c',
  nothing: 'n',
  just: 'j',
  set: 's',
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

var table = function() {
  this.val = [];
}
table.prototype = {
  add: function(val) {
    this.val = this.val.concat([val]);
    return this.val.length - 1;
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
      if (match(names.set, o)) {
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

var hook = function(h, s, t) {
  this.source = s;
  this.target = t;
  this.hook = p.mk_hook(h);

  this.table = new table();
  this.table.set(names.cursor, 0);
}
hook.prototype = {
  slice: function(t) {
    return t.val.slice(this.cursor, t.val.length);
  },
  update: function(delta) {
    this.table.set(names.cursor, this.table.read(names.cursor).val + delta);
  },
  parse: function(vals, source, target) {
    var string = this.slice(source);
    var result = this.hook(string);
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
    result.push(new cell(id, vals)]);
    _.each(b.hooks.list(), function(hook) {
      var target = this.table.look(hook.target);
      var new_vals = hook.parse(vals, source.table, target.table);
      result = result.concat(new_vals);
    });

    return result;
  },
  add: function(id, vals) {
    var mapping = this.suppose(id, vals);
    _.each(mapping, function(change) {
      var id = change.id;
      var vals = change.vals;

      var obj = this.table.look(id);
      obj.adds(vals);
    }
  },

  add_box: function(box) {
    this.table.add(box);
  },
  add_hook: function(h, s, t) {
    var hook_obj = new hook(h, s, t);
    var ref = this.table.add(hook_obj);
    this.table.look(s).hooks.add(ref);
  },
}

parse = function(hook, base, vals, target) {
  var string = base.slice().concat(vals);
  var change = hook(string);
}
mk_hook = function() {
}

module.exports = {
  box: box,
  table: table,
}
