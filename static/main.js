_ = require('underscore');
var dom = require('./dom');
client = require('./hive-client.js');

w = require('./web/box.js');
p   = require('./parse/parse.js');
pmk = require('./parse/util.js');
obj = require('./box/event.js');


var ws = client.init_ui();

c = p.newc('hello');
dub = p.seqs([p.blind,  p.neg_ref(0),   p.pos_ref(0)]);
sing = p.seqs([p.blind, p.neg_val('c'), p.pos_ref(0)]);


rev = p.seqs([p.blind, p.blind, p.pos_ref(0), p.pos_ref(1)]);

wrapper = function(env) {
  return [{unwrap: env[0]}];
}

ev = p.evalp;


var noop = function(str) {
  return function(obj, msg) {
    console.log(str, ' received ', msg);
  }
}
b1 = new obj.object(noop('b1'));
b2 = new obj.object(noop('b2'));
b1.add(obj.parse_hook(b2, dub));
