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

registerSlerp = function(obj, target, duration, tparam) {

  var q1 = new THREE.Quaternion();
  q1.copy(obj.quaternion);

  update = function(state, t) {
    THREE.Quaternion.slerp(q1, target, state, tparam(t));
    obj.quaternion.copy(state);
    updateUp();
  }
  registerAnimation(
      { type : 'camera'
      , duration : duration
      , state : new THREE.Quaternion()
      , update : update
      });
}

//registerLook = function(v) {
//  var q1 = new THREE.Quaternion();
//  var q2 = new THREE.Quaternion();
//
//  var m1 = new THREE.Matrix4();
//
//  // Start
//  q1.copy(camera.quaternion);
//  m1.lookAt(camera.position, v, camera.up);
//  // End
//  q2.setFromRotationMatrix(m1);
//
//  update = function(state, t) {
//    THREE.Quaternion.slerp(q1, q2, state, t);
//    camera.quaternion.copy(state);
//    updateUp();
//    //console.log(t);
//  }
//
//  registerAnimation(
//      { type : 'camera'
//      , duration : 200
//      , state : new THREE.Quaternion()
//      , update : update
//      });
//}

registerLook = function(v) {
  var q2 = new THREE.Quaternion();
  var m1 = new THREE.Matrix4();
  m1.lookAt(camera.position, v, camera.up);
  q2.setFromRotationMatrix(m1);

  registerSlerp(camera, q2, 200, id);
}


//registerRoll = function(delta) {
//  var q1 = new THREE.Quaternion();
//  var q2 = new THREE.Quaternion();
//
//  var r = new THREE.Euler();
//
//  // Start
//  q1.copy(camera.quaternion);
//  // End
//  r.copy(camera.rotation);
//  r.z += delta;
//  q2.setFromEuler(r);
//
//  update = function(state, t) {
//    THREE.Quaternion.slerp(q1, q2, state, Math.sqrt(t));
//    camera.quaternion.copy(state);
//    updateUp();
//  }
//
//  registerAnimation(
//      { type : 'camera'
//      , duration : 1400
//      , state : new THREE.Quaternion()
//      , update : update
//      });
//}
registerRoll = function(delta) {
  var q2 = new THREE.Quaternion();
  var r = camera.rotation.clone();
  r.z += delta;
  q2.setFromEuler(r);

  registerSlerp(camera, q2, 1400, Math.sqrt);
}



registerTranslation = function(dest) {
  var start = camera.position.clone();
  console.log(dest);
  // Make into a delta
  //dest.sub(start);

  update = function(state, t) {
    var d = dest.clone();
    d.multiplyScalar(t);
    camera.position.addVectors(start, d);
  }

  registerAnimation(
      { type : 'movement'
      , duration : 700
      , state : undefined
      , update : update
      });
}


registerTurn = function() {
  dest = camera.quaternion.clone();
  rot = new THREE.Quaternion();
  rot.setFromAxisAngle(v(0,1,0), Math.PI);
  dest.multiply(rot);

  registerSlerp(camera, dest, 600, id);
}
