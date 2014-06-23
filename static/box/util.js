var names = require('./types');

var nothing = function() {
  return {head: names.nothing};
}
var just = function(x) {
  return {head: names.just, val: x};
}

var m_maybe = function(m, cases) {
  switch (m.head) {
    case names.nothing:
      return cases.nothing();
    case names.just:
      return cases.just(m.val);
  }
}
var bind_maybe = function(m, f) {
  return m_maybe(m, {
    nothing: function() {
      return nothing();
    },
    just: function(val) {
      return f(val);
    },
  });
}
var is_just = function(m) {
  return m_maybe(m, {
    nothing: function() {
      return false;
    },
    just: function() {
      return true;
    }
  });
}
var m_list = function(list, cases) {
  switch (list.head) {
    case names.nil:
      return cases.nil();
    case names.cons:
      return cases.cons(list.hd, list.tl);
  }
}
var cs = function(arr, cases) {
  if (arr.length > 0) {
    return cases.cons(arr[0], arr.slice(1, arr.length));
  } else {
    return cases.nil();
  }
}
var nil = function() {
  return {head: names.nil};
}
var cons = function(h, t) {
  return {head: names.cons, hd: h, tl: t};
}
var mk = function(head) {
  return {head: head};
}

var is_digit = function(char) {
  var num = parseInt(char);
  if (isNaN(num)) {
    return nothing();
  } else {
    return just(num);
  }
}


module.exports = {
  nothing: nothing,
  just: just,
  m_maybe: m_maybe,
  m_list: m_list,
  bind_maybe: bind_maybe,
  is_just: is_just,
  is_digit: is_digit,

  mk: mk,
}
