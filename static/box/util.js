prefix = function(string, substring) {
  for(var i = 0; i < substring.length; i++) {
    if (string[i] !== substring[i]) {
      return {val: "", len: 0};
    }
  }
  return {val: substring, len: substring.length};
}
