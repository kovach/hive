// Update camera's up vector upon certain rotations
updateUp = function() {
  camera.up.set(0, 1, 0);
  camera.up.applyQuaternion(camera.quaternion);
}

// Raycast from camera to mouse x,y
updateIntersections = function(x, y) {
  var vector = v(x, y, 1);
  projector.unprojectVector(vector, camera);

  var origin = camera.position.clone();

  var ray = new THREE.Raycaster(origin,
      vector.sub(origin).normalize());

  var objs = ray.intersectObjects(blob_objects);
  // Hit a blob
  if (objs.length > 0) {

    var hit = objs[0];

    World.updateFocus(hit);

  } else {
    // Reset old target color
    if (World.focus) {
      World.focus.material.color.set(World.blobColor);
    }
    World.unfocus();
  }


  //arrow.setDirection(vector);
}
