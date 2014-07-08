var _ = require('underscore');
var dom = require('../dom');
var util = require ('./util');

var char_msg = function(char) {
  var out = {};
  switch (char) {
    case 'UP':
    case 'DOWN':
      out = undefined;
      break;
    case 'LEFT':
    case 'RIGHT':
      out.type = box_msg.move;
      out.val = char;
      break;
    case 'BACKSPACE':
      out.type = box_msg.delete;
      break;
    case 'RETURN':
      out.type = box_msg.newline;
      break;
    case 'ESCAPE':
      out.type = box_msg.escape;
      break;
    case 'CTRL':
    case 'ALT':
    case 'TAB':
    case 'SHIFT':
      out = undefined;
      break;
    default:
      out.type = box_msg.symbol;
      out.val = char;
      break;
  }
  return out;
}

var maker_msg = {
  new: 'new',
}
var maker = function(parent) {
  this.parent = parent;
}
maker.prototype = {
  handler: function(msg) {
    switch (msg.type) {
      case maker_msg.new:
        new box_ui(this.parent);
        break;
    }
  },
}

var box_msg = {
  symbol: 's',
  move: 'm',
  delete: 'd',
  newline: 'n',
  escape: 'e',
}

var box_ui = function(parent) {
  this.parent = parent;
  this.cursor = 0;
  this.nodes = [];
  this.front = [];
  this.back = [];

  this.color = "#fc5";

  this.div = dom.mk_div('edit-box', _.uniqueId());
  dom.app(parent, this.div);
}

box_ui.prototype = {
  node: function() {
    return this.div;
  },
  current: function() {
    return this.nodes[this.cursor];
  },
  handle_char: function(char) {
    return this.handle(char_msg(char));
  },
  handler: function(msg) {
    if (msg === undefined) {
      return;
    }
    switch (msg.type) {
      case box_msg.symbol:
        this.add_char(util.to_string(msg.val));
        break;
      case box_msg.move:
        if (msg.val === 'LEFT') {
          this.left();
        } else if (msg.val === 'RIGHT') {
          this.right();
        }
        break;
      case box_msg.delete:
        this.backspace();
        break;
      case box_msg.newline:
        this.newline();
        break;
    }
  },
  add_char: function(char) {
    var node = dom.mk_text(char, this.color);
    dom.before(node, this.parent, _.last(this.back));
    this.front.push(node);
  },
  left: function() {
    var c = this.front.pop();
    if (c) {
      this.back.push(c);
    }
  },
  right: function() {
    var c = this.back.pop();
    if (c) {
      this.front.push(c);
    }
  },
  backspace: function() {
    var node = this.front.pop();
    if (node) {
      dom.remove(node);
    }
  },
  escape: function() {
  },
  // Hmmm
  newline: function() {
  },
}


module.exports = {
  maker: maker,
  box_ui: box_ui,
  char_msg: char_msg,
}
