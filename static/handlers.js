var world = require('./world.js');
var rendering = require('./rendering.js');

var debug = false;

updateOrtho = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.left = width / -2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = height / -2;
  camera.updateProjectionMatrix();
}

resizeHandler = function (camera, renderer) {
  return function () {
    renderer.setSize(window.innerWidth, window.innerHeight);

    rendering.withCamera({
      ortho: updateOrtho,

      perspective: function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      },
    });

  }
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

module.exports = {
  initHandlers: initHandlers,
  resizeHandler: resizeHandler,
  debug: debug,
}

