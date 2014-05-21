world = {};
world.focus = undefined;
world.target = undefined;
world.blobColor = 0xffffff;
world.focusColor = 0xF58D1D;
world.blobRadius = 1;
world.objects = [];
world.unit = 22;

world.randPoint = function(scale) {
  var b = 22;
  var xmax = b;
  var ymax = b;
  var zmax = b;

  return v( scale * (Math.random() * xmax - xmax / 2)
          , scale * (Math.random() * ymax - ymax / 2)
          , scale * (Math.random() * zmax - zmax / 2)
          );
}

world.setFocus = function(hit) {
  world.focus = hit.object;
  world.focus.material.color.set(world.focusColor);
}

world.updateFocus = function(hit) {
  if (world.focus) {
    if (world.focus._id === hit.object._id) {
      // do nothing
    } else {
      // Reset color
      world.unfocus();
      world.setFocus(hit);
    }
  } else {
    world.setFocus(hit);
  }
}
world.unfocus = function() {
  if (world.focus) {
    world.focus.material.color.set(world.blobColor);
    world.focus = undefined;
  }
}

world.setTarget = function(id) {
  world.target = id;
}

world.lookupObj = function(id) {
  return lookup(blob_objects, id);
}
world.lookup = function(id) {
  return lookup(blobs, id);
}

