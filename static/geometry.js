// Update camera's up vector upon certain rotations
updateUp = function() {
  camera.up.set(0, 1, 0);
  camera.up.applyQuaternion(camera.quaternion);
}

// Raycast from camera to mouse x,y
updateIntersections = function(px, py) {
  var x =  (px / window.innerWidth)  * 2 - 1;
  var y = -(py / window.innerHeight) * 2 + 1;

  var vector = v(x, y, 1);
  projector.unprojectVector(vector, camera);

  var origin = camera.position.clone();

  var ray = new THREE.Raycaster(origin,
      vector.sub(origin).normalize());

  var objs = ray.intersectObjects(world.objects);
  // Hit a blob
  if (objs.length > 0) {
    var hit = objs[0];
    //console.log('hit: ', hit);

    world.updateFocus(hit);

  } else {
    // Reset old target color
    if (world.focus) {
      world.focus.material.color.set(world.blobColor);
    }
    world.unfocus();
  }


  //arrow.setDirection(vector);
}
