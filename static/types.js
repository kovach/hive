if(typeof exports !== 'undefined'){
  var _ = require('underscore');
}

checker = {
  any: function() {
    return {type: 'any'};
  },
  eq: function(val) {
    return {type: 'eq', value: val };
  },
  type: function(val) {
    return {type: 'type', value: val};
  },
  obj: function(obj) {
    var result = {type: 'obj', val: {}};
    _.each(obj, function(val, key) {
      result.val[key] = val;
    });
    return result;
  },
  check: function(form, val) {
    switch (form.type) {
      case 'any':
        return true;
      case 'eq':
        return form.value === val;
      case 'type':
        return typeof(form.value) === typeof(val);
      case 'obj':
        console.log('obj');
        var result = true;
        var no_match = _.find(form.val, function(subform, key) {
            if (val[key] === undefined || !checker.check(subform, val[key])) {
              return true;
            }
        });
        if (no_match === undefined) {
          return true;
        } else {
          return false;
        }
    }
  },
}

var c = checker;
var eqm = checker.eq('move');
var num = checker.type(0);
var move = checker.obj({head: c.eq('move'), x: c.type(0), y: c.type(0), id: c.any() });



if (typeof module !== 'undefined') {
  module.exports = {
    checker: checker,
  }
}
