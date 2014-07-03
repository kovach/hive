var tc = String.fromCharCode
var symbols = {
  left: tc(0x2190),
  up: tc(0x2191),
  right: tc(0x2192),
  down: tc(0x2193),

  back: tc(0x21B6),
  ret: tc(0x21B5),
  esc: tc(0x21B8),

  ctrl: tc(0x2303),
  shift: tc(0x21E7),
  alt: tc(0x2325),
  tab: tc(0x21E5),
}

to_string = function(char) {
  switch(char) {
    case 'LEFT':
      return symbols.left;
    case 'UP':
      return symbols.up;
    case 'RIGHT':
      return symbols.right;
    case 'DOWN':
      return symbols.down;
    case 'BACKSPACE':
      return symbols.back;
    case 'ESCAPE':
      return symbols.esc;
    case 'RETURN':
      return symbols.ret;
    case 'CTRL':
      return symbols.ctrl;
    case 'ALT':
      return symbols.alt;
    case 'TAB':
      return symbols.tab;
    case 'SHIFT':
      return undefined;
    default:
      return char;
  }
}

module.exports = {
  to_string: to_string,
}
