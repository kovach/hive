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
updateUp = function() {
  camera.up.set(0, 1, 0);
  camera.up.applyQuaternion(camera.quaternion);
}
keyHandle = function(key) {
  switch (key) {
    case 'w':
      //camera.rotation.x += 0.1;
      break;
    case 's':
      //camera.rotation.x -= 0.1;
      break;
    case 'a':
      registerRoll(0.5);
      //camera.rotation.z += 0.1;
      //updateUp();
      //console.log('up: ', camera.up);
      break;
    case 'd':
      registerRoll(-0.5);
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

initKeyboard = function() {
  console.log('key init');
  window.addEventListener('keypress', keyPressHandler);
  window.addEventListener('keydown', keyDownHandler);
}
