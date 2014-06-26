var _ = require('underscore');
var p = require('../parse/parse.js');

var object = function(h) {
  this.handler = h;
  this.handlers = [];
  this.id = _.uniqueId();
}
object.prototype = {
  add: function(h) {
    this.handlers.push(h);
  },
}
var send = function(obj, msg) {
  obj.handler(obj, msg);
  _.each(obj.handlers, function(h) {
    send(h, msg);
  });
}

var hook = function(target, f) {
  return new object(function(obj, msg) {
    var out = f(obj, msg);
    if (out !== undefined) {
      send(target, out);
    }
  });
}

var fail = function() {
  return undefined;
}

var parse_hook = function(target, parser) {
  var obj = hook(target, function(obj, msg) {
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
