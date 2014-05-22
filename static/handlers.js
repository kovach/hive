resizeHandler = function (camera, renderer) {
  return function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateOrtho();
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
  }
}

updateOrtho = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.left = width / -2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = height / -2;
  camera.updateProjectionMatrix();
}



keyPressHandler = function(ev) {
  var c = String.fromCharCode(ev.keyCode);
  if (debug)
    console.log('char: ', c);
  keyHandle(c);
}
keyDownHandler = function(ev) {
  if (debug)
    console.log('key: ', ev.keyCode);
  var k = '';
  switch (ev.keyCode) {
    case 8:
      k = 'BACKSPACE';
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
    default:
      return;
  }

  keyHandle(k);
}

// Game Keybindings
keyHandle = function(key) {
  switch (key) {
    case 'w':
      World.move();
      break;
    case 'e':
      registerTurn();
      break;
    case 's':
      //camera.rotation.x -= 0.1;
      break;
    case 'a':
      registerRoll(1.5);
      //camera.rotation.z += 0.1;
      //updateUp();
      //console.log('up: ', camera.up);
      break;
    case 'd':
      registerRoll(-1.5);
      //camera.rotation.z -= 0.1;
      //updateUp();
      //console.log('up: ', camera.up);
      break;
    case 'j':
      registerLook(vec(blobs[0]));
      break;
    case 'k':
      registerLook(vec(blobs[1]));
      break;
    case 'l':
  }
}

mouseMoveHandler = function(ev) {
  updateIntersections(ev.clientX, ev.clientY); 
}
clickHandler = function(ev) {
  //var x = ev.x;
  //var y = ev.y;

  console.log('click');
  world.send_move();
}

initHandlers = function() {
  console.log('key init');
  //window.addEventListener('keypress', keyPressHandler);
  //window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('click', clickHandler);
  window.addEventListener('contextmenu', function(ev) {
    clickHandler(ev);
    ev.preventDefault();
  });
}
