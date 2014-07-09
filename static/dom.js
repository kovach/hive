var _ = require('underscore');

var get = function(id) {
  return document.getElementById(id);
}
var app = function(parent, node) {
  parent.appendChild(node);
  return node;
}
var before = function(node, parent, sibling) {
  if (sibling) {
    parent.insertBefore(node, sibling);
  } else {
    app(parent, node);
  }
  return node;
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
var mk_div = function(cl, id) {
  var node = mk_elem('div', cl, id);
  return node;
}
var mk_text = function(text, color) {
  var box = mk_div('str', _.uniqueId());
  var node = document.createTextNode(text);
  box.appendChild(node);

  if (color) {
    box.style.color = color;
  }
  return box;
}
var remove = function(node) {
  node.parentNode.removeChild(node);
}

module.exports = {
  get: get,
  app: app,
  before: before,
  set: set,
  mk_div: mk_div,
  mk_text: mk_text,
  remove: remove,
}
