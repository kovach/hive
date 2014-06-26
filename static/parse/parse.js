var _ = require('underscore');

var pair = function(fst, snd) {
  return {fst: fst, snd: snd};
}

var newc = function(arr) {
  return {
    str: arr,
    out: [],
    side: [],
    fail: false,
    val: undefined,
  }
}
var arrc = function(arr) {
  return arr.concat([]);
}
var copy = function(c) {
  return {
    str: arrc(c.str),
    side: arrc(c.side),
    out: arrc(c.out),
    fail: c.fail,
    //val: c.val,
  };
}
var next = function(c) {
  if (c.str.length > 0) {
    var out = copy(c);
    out.val = c.str[0];
    return out;
  } else {
    return fail(c);
  }
}
var ref = function(ind, c) {
  return c.side[c.side.length - 1 - ind];
}
var pop = function(c) {
  var out = copy(c);
  out.str = out.str.slice(1, out.str.length);
  return out;
}
var push_side = function(c, obj) {
  var out = copy(c);
  out.side.push(obj);
  return out;
}
var push_out = function(c, obj) {
  var out = copy(c);
  out.out.push(obj);
  return out;
}
var fail = function(c) {
  var out = copy(c);
  out.fail = true;
  return out;
}
var neg_val = function(val) {
  return function(c) {
    return bind(next(c), function(c, next_val) {
      if (_.isEqual(next_val, val)) {
        return pop(c);
      } else {
        return fail(c);
      }
    });
  }
}
var pos_val = function(val) {
  return function(c) {
    return push_out(c, val);
  }
}
var bind = function(c, rest) {
  if (c.fail) {
    return c;
  } else {
    var out = rest(c, c.val);
    return out;
  }
}
var blind = function(c) {
  return bind(next(c), function(c, val) {
    return push_side(pop(c), val);
  });
}
var neg_ref = function(index) {
  return function(c) {
    return neg_val(ref(index, c))(c);
  }
}
var pos_ref = function(index) {
  return function(c) {
    return push_out(c, ref(index, c));
  }
}

var lseq = function(p1, fp2) {
  return function(c) {
    return bind(p1(c), function(c) {
      return fp2()(c);
    });
  }
}
var seq = function(p1, p2) {
  return function(c) {
    return bind(p1(c), function(c) {
      return p2(c);
    });
  }
}

var seqs = function(ps) {
  return function(c) {
    if (ps.length === 0) {
      return c;
    } else {
      return seq(ps[0], seqs(ps.slice(1, ps.length)))(c);
    }
  }
}

var string = function(str) {
  return seqs(_.map(str, neg_val));
}

var evalp = function(p, arr) {
  var result = p(newc(arr));
  if (result.fail) {
    return false;
  } else {
    return result.out;
  }
}

var or = function(p1, p2) {
  return function(c) {
    var r1 = p1(c);
    if (r1.fail) {
      return p2(c);
    }
    return r1;
  }
}
var ors = function(ps) {
  return function(c) {
    if (ps.length === 0) {
      return fail(c);
    } else {
      return or(ps[0], ors(ps.slice(1, ps.length)))(c);
    }
  }
}

var maker = function(ind, fn) {
  return function(c) {
    var val = fn(ref(ind, c));
    return pos_val(val)(c);
  }
}
var none = function(c) {
  return c;
}

var many = function(p) {
  return or(many1(p), none);
}
var many1 = function(p) {
  return lseq(p, function() { return many(p); });
}


module.exports = {
  newc: newc,
  arrc: arrc,
  copy: copy,
  next: next,
  pop: pop,
  push_side: push_side,
  push_out: push_out,
  fail: fail,
  neg_val: neg_val,
  pos_val: pos_val,
  bind: bind,
  blind: blind,
  neg_ref: neg_ref,
  pos_ref: pos_ref,
  seq: seq,
  seqs: seqs,
  string: string,
  evalp: evalp,
  or: or,
  ors: ors,
  maker: maker,
  none: none,
  many: many,
  many1: many1,
}
