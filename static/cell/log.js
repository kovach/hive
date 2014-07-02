log = function() {
  this.log = [];
}
log.prototype = {
  add: function(val) {
    return this.adds([val]);
  },
  adds: function(vals) {
    this.log = this.log.concat(vals);
    return this.log.length -1;
  },
  look: function(ref) {
    return this.log[ref];
  },
}

module.exports = {
  log: log,
}
