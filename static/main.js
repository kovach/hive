_ = require('underscore');
var dom = require('./dom');
client = require('./hive-client.js');

w = require('./web/box.js');
p   = require('./parse/parse.js');
pmk = require('./parse/util.js');
obj = require('./cell/event.js');
client = require('./cell/client.js');


c = p.newc('hello');
dub = p.seqs([p.blind,  p.neg_ref(0),   p.pos_ref(0)]);
sing = p.seqs([p.blind, p.neg_val('c'), p.pos_ref(0)]);

rev = p.seqs([p.blind, p.blind, p.pos_ref(0), p.pos_ref(1)]);

ev = p.evalp;


var log_fn = function(str) {
  return function(obj, msg) {
    console.log(str, ' received ', msg);
  }
}
//b1 = new obj.object(log_fn('b1'));
//b2 = new obj.object(log_fn('b2'));
//b1.add(obj.parse_hook(b2, dub));


client.init_ui();
