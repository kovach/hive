_ = require('underscore');
var dom = require('./dom');
client = require('./hive-client.js');

w = require('./web/box.js');
p = require('./parse/parse.js');


//var u = require('./box/util.js');
//var names = require('./box/types.js');
//
//box = require('./box/box.js');
//p = require('./box/parsing.js');
//
//hook_table = new box.table();
//hook_table.add(box.pre_parser('foo', box.str_fn('bar')));
//// identity parser
//hook_table.add(box.pre_parser('_', function(c) {
//  return c[0]+'';
//}));
//
//
//w = new box.context();
//b1 = new box.box();
//b2 = new box.box();
//id1 = w.add_box(b1);
//id2 = w.add_box(b2);
//
//hook1 = new hook();
//
//var hook_id = w.add(hook_table);
//w.add_hook(hook_id, id1, id2);


var ws = client.init_ui();

