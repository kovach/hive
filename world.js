World = {};
World.focus = undefined;
World.blobColor = 0xffffff;
World.focusColor = 0x66ccff;


World.randPoint = function() {
  var b = 22;
  var xmax = b;
  var ymax = b;
  var zmax = b;

  return v( Math.random() * xmax - xmax / 2
          , Math.random() * ymax - ymax / 2
          , Math.random() * zmax - zmax / 2
          );
}

World.setFocus = function(hit) {
  World.focus = hit.object;
  World.focus.material.color.set(World.focusColor);

  console.log('dist: ', hit.distance);
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

