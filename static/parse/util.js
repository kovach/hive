var p = require('./parse.js');

var mk_neg_p = function(str) {
  blind = p.seqs([
      p.neg_val('_'),
      p.pos_val(p.blind)]);
  ref = p.seqs([
      p.neg_val('@'),
      p.blind,
      p.maker(0, p.neg_ref)]);
  esc = p.seqs([p.neg_val('\\'), p.blind, p.maker(0, p.neg_val)]);
  id = p.seq(p.blind, p.maker(0, p.neg_val));

  return p.seqs(p.evalp(p.many(p.ors([blind, ref, esc, id])), str));
}
var mk_pos_p = function(str) {
  ref = p.seqs([
      p.neg_val('@'),
      p.blind,
      p.maker(0, p.pos_ref)]);
  esc = p.seqs([p.neg_val('\\'), p.blind, p.maker(0, p.pos_val)]);
  id = p.seq(p.blind, p.maker(0, p.pos_val));

  return p.seqs(p.evalp(p.many(p.ors([ref, esc, id])), str));
}
var mk_arrow = function(input, output) {
  return p.seq(mk_neg_p(input), mk_pos_p(output));
}

module.exports = {
  mk_neg_p: mk_neg_p,
  mk_pos_p: mk_pos_p,
  mk_arrow: mk_arrow,
}
