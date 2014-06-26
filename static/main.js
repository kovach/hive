_ = require('underscore');
var dom = require('./dom');
client = require('./hive-client.js');

w = require('./web/box.js');
p = require('./parse/parse.js');
t = require('./parse/util.js');


var ws = client.init_ui();

c = p.newc('hello');
dub = p.seqs([p.blind,  p.neg_ref(0),   p.pos_ref(0)]);
sing = p.seqs([p.blind, p.neg_val('c'), p.pos_ref(0)]);

esc = p.seqs([p.neg_val('\\'), p.blind, p.pos_ref(0)]);
id = p.seq(p.blind, p.pos_ref(0));

charp = p.or(esc, id);

rev = p.seqs([p.blind, p.blind, p.pos_ref(0), p.pos_ref(1)]);

wrapper = function(env) {
  return [{unwrap: env[0]}];
}

ev = p.evalp;
