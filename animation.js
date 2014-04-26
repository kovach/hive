animations = [];

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
    console.log(t);
  }

  registerAnimation(
      { type : 'camera'
      , q1 : q1, q2 : q2
      , duration : 200
      , init : new THREE.Quaternion()
      , update : update
      });
}

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

registerAnimation = function(spec) {
  var t = new Date().getTime();

  animations.push(
      { duration : spec.duration
      , start : t
      , state : spec.init 
      , update : spec.update
      });
}

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
