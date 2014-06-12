var world = require('./world.js');
var camera;
var scene;
var renderer;

var camera_modes = {ortho:'o', perspective: 'p'};
var camera_mode = camera_modes.ortho;

var Type = {
  cube: 'cube',
};

var geometries = {};
geometries[Type.cube] = new THREE.BoxGeometry(world.unit, world.unit, world.unit);


withCamera = function(cases) {
  if (camera_mode === camera_modes.ortho) {
    return cases.ortho();
  } else if (camera_mode === camera_modes.perspective) {
    return cases.perspective();
  }
}


initObject = function(object) {
  switch (object.type) {
    case Type.cube:
      var geometry = geometries[Type.cube];
      var material = new THREE.MeshBasicMaterial({color: 0xffffff});
      var cube = new THREE.Mesh(geometry, material);

      cube._id = thing.id;
      world.objects.push(cube);
      thing.object = cube;
      thing.update();
      scene.add(cube);
      break;
  }
}

module.exports = {
  camera: camera,
  scene: scene,
  renderer: renderer,

  withCamera: withCamera,
  camera: camera
}
