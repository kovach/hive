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

// Register
registerAnimation = function(spec) {
  var t = new Date().getTime();

  animations.push(
      { duration : spec.duration
      , start : t
      , state : spec.init 
      , update : spec.update
      });
}

// Animation types
registerTest = function() {
  update = function(state, t) {
    console.log(t);
  }

  registerAnimation(
      { duration : 1000
      , type : 'test'
      , init : undefined
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
      { type : 'look'
      , q1 : q1, q2 : q2
      , duration : 200
      , init : new THREE.Quaternion()
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
  }

  registerAnimation(
      { type : 'roll'
      , q1 : q1, q2 : q2
      , duration : 1000
      , init : new THREE.Quaternion()
      , update : update
      });
}

