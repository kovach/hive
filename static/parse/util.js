var p = require('./parse.js');

// Turn a string into a parser
var neg_p = function(str) {
  var blind = p.seqs([
      p.neg_val('_'),
      p.pos_val(p.blind)]);
  var ref = p.seqs([
      p.neg_val('@'),
      p.blind,
      p.maker(0, p.neg_ref)]);
  var esc = p.seqs([p.neg_val('\\'), p.blind, p.maker(0, p.neg_val)]);
  var id = p.seq(p.blind, p.maker(0, p.neg_val));

  return p.seqs(p.evalp(p.many(p.ors([blind, ref, esc, id])), str));
}
var pos_p = function(str) {
  var ref = p.seqs([
      p.neg_val('@'),
      p.blind,
      p.maker(0, p.pos_ref)]);
  var esc = p.seqs([p.neg_val('\\'), p.blind, p.maker(0, p.pos_val)]);
  var id = p.seq(p.blind, p.maker(0, p.pos_val));

  return p.seqs(p.evalp(p.many(p.ors([ref, esc, id])), str));
}
var arrow = function(input, output) {
  return p.seq(neg_p(input), pos_p(output));
}

var pexp = function(p) {
  var seq = [
    p.neg_val('('),
    p,
    p.neg_val(')')
  ];
  return p.seqs(seq);
}

module.exports = {
  neg_p: neg_p,
  pos_p: pos_p,
  arrow: arrow,
}
