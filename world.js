World = {};
World.focus = undefined;
World.target = undefined;
World.blobColor = 0xffffff;
World.focusColor = 0x66ccff;
World.blobRadius = 1;

World.makeBlob = function() {
  var b = {};
  b.radius = 0.4 + Math.random() * 0.4
  b.position = World.randPoint(1);

  return b;
}

World.randPoint = function(scale) {
  var b = 22;
  var xmax = b;
  var ymax = b;
  var zmax = b;

  return v( scale * (Math.random() * xmax - xmax / 2)
          , scale * (Math.random() * ymax - ymax / 2)
          , scale * (Math.random() * zmax - zmax / 2)
          );
}

World.setFocus = function(hit) {
  World.focus = hit.object;
  World.focus.material.color.set(World.focusColor);

  //console.log('dist: ', hit.distance);
}

World.updateFocus = function(hit) {
  if (World.focus) {
    if (World.focus._id === hit.object._id) {
      // do nothing
    } else {
      // Reset color
      World.unfocus();
      World.setFocus(hit);
    }
  } else {
    World.setFocus(hit);
  }
}
World.unfocus = function() {
  if (World.focus) {
    World.focus.material.color.set(World.blobColor);
    World.focus = undefined;
  }
}

World.setTarget = function(id) {
  World.target = id;
}

World.lookupObj = function(id) {
  return lookup(blob_objects, id);
}
World.lookup = function(id) {
  return lookup(blobs, id);
}

World.move = function() {
  var target = World.target;
  if (target) {
    var obj3d = World.lookupObj(target);
    var dest = obj3d.position.clone();
    dest.sub(camera.position);
    var len = dest.length();
    dest.multiplyScalar((len - World.lookup(target).radius*2) / len);
    registerTranslation(dest);
  } else {
    console.log('no target!');
  }
}
