var _ = require('underscore');
var p = require('../parse/parse.js');

var object = function(h, maybe_init) {
  this.handler = h;
  this.handlers = [];
  this.id = _.uniqueId();
  if (maybe_init) {
    maybe_init(this);
  }
}
object.prototype = {
  add: function(h) {
    this.handlers.push(h);
  },
}
var send = function(msg, obj) {
  obj.handler(msg, obj);
  _.each(obj.handlers, function(h) {
    send(msg, h);
  });
}

var hook = function(f, target) {
  return new object(function(msg, obj) {
    var out = f(msg, obj);
    if (out !== undefined) {
      send(out, target);
    }
  });
}

var fail = function() {
  return undefined;
}

var parse_hook = function(parser, target) {
  var obj = hook(target, function(msg, obj) {
    obj.str = obj.str.concat(msg);
    var out = p.many1(parser)(p.newc(obj.str));
    if (out.fail) {
      console.log('no parse');
      return fail();
    } else {
      obj.str = out.str;
      return out.out;
    }
  });
  obj.str = [];
  return obj;
}

module.exports = {
  object: object,
  send: send,
  hook: hook,
  parse_hook: parse_hook,
}
