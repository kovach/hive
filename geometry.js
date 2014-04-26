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
  //var origin = blobs[0].clone();

  var ray = new THREE.Raycaster(origin,
      vector.sub(origin).normalize());

  //console.log('ray: ', ray.ray.direction);

  var objs = ray.intersectObjects(blob_objects);
  if (objs.length > 0) {
    console.log(objs);
  }

  arrow.setDirection(vector);
}
