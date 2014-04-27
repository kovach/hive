debug = false;

resizeHandler = function (camera, renderer) {
  return function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
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
      //camera.rotation.x += 0.1;
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
  var x =  (ev.clientX / window.innerWidth)  * 2 - 1;
  var y = -(ev.clientY / window.innerHeight) * 2 + 1;

  updateIntersections(x,y);
}
clickHandler = function(ev) {
  var x = ev.x;
  var y = ev.y;

  if (World.focus) {
    var id = World.focus._id;
    var mobj = lookup(blob_objects, id);
    if (mobj) {
      registerLook(mobj.position);
    } else {
      console.log('ERROR');
    }
  }
}

initHandlers = function() {
  console.log('key init');
  window.addEventListener('keypress', keyPressHandler);
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('click', clickHandler);
}
