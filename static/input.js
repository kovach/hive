var debug;


var to_key_handler = function(key_fn, debug) {

  var press = function(ev) {
    var c = String.fromCharCode(ev.charCode);
    if (debug){
      console.log('char: ', c);
    }
    key_fn(c);
  }

  var down = function(ev) {
    if (debug)
      console.log('key: ', ev.keyCode);
    var k = '';
    switch (ev.keyCode) {
      case 8:
        k = 'BACKSPACE';
        ev.preventDefault();
        break;
      case 27:
        k = 'ESCAPE';
        break;
      case 37:
        k = 'LEFT';
        break;
      case 38:
        k = 'UP';
        break;
      case 39:
        k = 'RIGHT';
        break;
      case 40:
        k = 'DOWN';
        break;
      case 13:
        k = 'RETURN';
        break;
      case 17:
        k = 'CTRL';
        break;
      case 16:
        k = 'SHIFT';
        break;
      case 18:
        k = 'ALT';
        break;
      case 9:
        k = 'TAB';
        break;
      default:
        return;
    }

    key_fn(k);
  }


  return {press: press, down: down};
}

var add_key_handler = function(node, key_fn, debug) {
  var handlers = to_key_handler(key_fn, debug);

  node.addEventListener('keypress', handlers.press);
  node.addEventListener('keydown' , handlers.down);
}

module.exports = {
  add_key_handler: add_key_handler,
  debug: debug,
}
