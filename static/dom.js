var _ = require('underscore');

var get = function(id) {
  return document.getElementById(id);
}
var append = function(parent, node) {
  parent.appendChild(node);
}
var set = function(node, attr, val) {
  return node.setAttribute(attr, val);
}
var mk_elem = function(type, cl, id) {
  var node = document.createElement(type);
  node.setAttribute('class', cl);
  if (id) {
    node.setAttribute('id', id);
  }
  node.setAttribute('tabindex', 1);

  return node;
}
var mk_div = function(parent, cl, id) {
  var node = mk_elem('div', cl, id);
  parent.appendChild(node);
  return node;
}
var mk_text = function(parent, text, color) {
  var box = mk_div(parent, 'str', _.uniqueId());
  var node = document.createTextNode(text);
  box.appendChild(node);

  if (color) {
    box.style.color = color;
  }
  return node;
}

module.exports = {
  get: get,
  append: append,
  set: set,
  mk_div: mk_div,
  mk_text: mk_text,
}
