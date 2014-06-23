var _ = require('underscore');
var u = require('./util.js');
var names = require('./types.js');

var pair = function(fst, snd) {
  return {fst: fst, snd: snd};
}
var succ = function(val, rest) {
  return {val: val, rest: rest};
}

var parse_table = function(string, table) {
  var bindings = u.just({});
  var patterns = table.list();

  for (var i = 0; i < patterns.length; i++) {
    if (i >= string.length) {
      return u.nothing();
    }

    bindings = u.bind_maybe(bindings, function(bs) {
      return u.bind_maybe(parse_entry(string[i], patterns[i]),
        function(val) {
          bs[i] = val;
          return u.just(bs);
        });
    });
  }

  var result = u.bind_maybe(bindings, function(bs) {
    return u.just(pair(table.length(), bs));
  });
  return result;
}
var parse_entry = function(entry, pattern) {
  switch (pattern.head) {
    case names.match:
      if (entry === pattern.val) {
        return u.just(entry);
      }
      break;
    case names.hole:
      return u.just(entry);
      break;
  }
  return u.nothing();
}

var eval_pattern_fn = function(fn, context) {
  return fn(context);
}
var eval_pattern = function(table, context) {
  return _.map(table.list(), function(pattern) {
    switch (pattern.head) {
      case names.match:
        return pattern.val;
      case names.ref:
        return context[pattern.val];
    }
  });
}

var parse_string = function(string, table) {
  var parses = _.map(table.list(), function(row) {
    return parse_table(string, row.look(0));
  });
  parses = _.zip(_.range(parses.length), parses);
  var parse = _.find(parses, function(pair) {
    return u.is_just(pair[1]);
  });
  if (parse !== undefined) {
    // Get the corresponding result expression and fill it in
    var post = eval_pattern_fn(
        table.look(parse[0]).look(1),
        parse[1].val.snd);
    return u.just(pair(parse[1].val.fst, post));
  }
}


//var parse_with_table = function(string, table, index) {
//  if (index === undefined) {
//    index = 0;
//  }
//
//  return u.cs(table, {
//    nil: function() {
//      return nothing();
//    },
//    cons: function(p, ps) {
//      var vals = parse_with_pattern(string, p, index);
//      return _.flatten(_.map(vals, function(val) {
//        return parse_with_table(
//        
//      }), true);
//    },
//  });
//}
//var parse_with_pattern = function(string, pattern, index) {
//  switch (pattern.head) {
//    case names.match:
//      return u.cs(string, {
//        nil: function() {
//          return [];
//        },
//        cons: function(x, xs) {
//          if (x === pattern.val) {
//            return [succ(x, xs)];
//          } else {
//            return [];
//          }
//        },
//      });
//      break;
//    case names.hole:
//      return u.cs(string, {
//        nil: function() {
//          return [];
//        },
//        cons: function(x, xs) {
//          return [succ(pair(index, x), xs)];
//        },
//      });
//      break;
//    case names.seq:
//      break;
//  }
//}
//
//var pre_hook = function() {
//  this.table = new table();
//}
//pre_hook.prototype = {
//}
//    return {
//      hook : _,
//      output: _,
//    };


module.exports = {
  parse_table: parse_table,
  parse_entry: parse_entry,
  parse_string: parse_string,
}
