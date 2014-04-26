debug = false;
animations = [];

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
keyHandle = function(key) {
  switch (key) {
    case 'w':
      camera.rotation.x += 0.1;
      break;
    case 's':
      camera.rotation.x -= 0.1;
      break;
    case 'a':
      camera.rotation.z += 0.1;
      //camera.rotation.y += 0.1;
      break;
    case 'd':
      camera.rotation.z -= 0.1;
      //camera.rotation.y -= 0.1;
      break;
    case 'j':
      //camera.up.set(0, -1, 0);
      //camera.lookAt(vec(points[0]));
      registerLook(vec(points[0]));
      break;
    case 'k':
      //camera.up.set(0, 1, 0);
      //camera.lookAt(vec(points[1]));
      registerLook(vec(points[1]));
      break;
    case 'l':
  }
}

registerLook = function(v) {
  var q1 = new THREE.Quaternion();
  var q2 = new THREE.Quaternion();

  var m1 = new THREE.Matrix4();

  // Start
  q1.copy(camera.rotation._quaternion);
  m1.lookAt(camera.position, v, camera.up);
  // End
  q2.setFromRotationMatrix(m1);

  // Animation
  registerAnimation({ type : 'camera',
    q1 : q1, q2 : q2,
    duration : 200,
    init : new THREE.Quaternion()
  });
}

registerAnimation = function(spec) {
  var t = new Date().getTime();
  var updates =
  { camera : function(state, t) {
      THREE.Quaternion.slerp(spec.q1, spec.q2, state, t);
      camera.rotation._quaternion.copy(state);
      console.log(t);
    }
  , test : function(state, t) {
      console.log(t);
    }
  }

  animations.push(
      { duration : spec.duration
      , start : t
      , state : spec.init 
      , update : updates[spec.type]
      });
}
normalizeTime = function(animation) {
  var t = new Date().getTime();
  return (t - animation.start) / animation.duration;
}

initKeyboard = function() {
  console.log('key init');
  window.addEventListener('keypress', keyPressHandler);
  window.addEventListener('keydown', keyDownHandler);
}
