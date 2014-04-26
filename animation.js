camera_animation = undefined;
animations = [];

// Util
normalizeTime = function(animation) {
  var t = new Date().getTime();
  return (t - animation.start) / animation.duration;
}

updateAnimation = function(a) {
  var t = normalizeTime(a);
  if (t > 1) {
    a.update(a.state, 1);
    return false;
  } else {
    a.update(a.state, t);
    return true;
  }
}
updateAnimations = function() {
  animations = _.filter(animations, updateAnimation);
  camera_animation = _.filter(camera_animation, updateAnimation);

// Register
registerAnimation = function(spec) {
  var start = new Date().getTime();
  spec.start = start;
  switch (spec.type) {
    case 'camera':
      if (camera_animation.length === 0) {
        camera_animation.push(spec);
      }
      break;
    default:
      animations.push(spec);
      break;
  }
}

}

// Animation types
registerTest = function() {
  update = function(state, t) {
    console.log(t);
  }

  registerAnimation(
      { duration : 1000
      , type : 'test'
      , state : undefined
      , update : update
      });
}

registerLook = function(v) {
  var q1 = new THREE.Quaternion();
  var q2 = new THREE.Quaternion();

  var m1 = new THREE.Matrix4();

  // Start
  q1.copy(camera.quaternion);
  m1.lookAt(camera.position, v, camera.up);
  // End
  q2.setFromRotationMatrix(m1);

  update = function(state, t) {
    THREE.Quaternion.slerp(q1, q2, state, t);
    camera.quaternion.copy(state);
    //console.log(t);
  }

  registerAnimation(
      { type : 'camera'
      , q1 : q1, q2 : q2
      , duration : 200
      , state : new THREE.Quaternion()
      , update : update
      });
}

registerRoll = function(delta) {
  var q1 = new THREE.Quaternion();
  var q2 = new THREE.Quaternion();

  var r = new THREE.Euler();

  // Start
  q1.copy(camera.quaternion);
  // End
  r.copy(camera.rotation);
  r.z += delta;
  q2.setFromEuler(r);

  update = function(state, t) {
    THREE.Quaternion.slerp(q1, q2, state, Math.sqrt(t));
    camera.quaternion.copy(state);
    updateUp();
  }

  registerAnimation(
      { type : 'camera'
      , q1 : q1, q2 : q2
      , duration : 1400
      , state : new THREE.Quaternion()
      , update : update
      });
}

