var world = require('./world.js');
var camera;
var scene;
var renderer;

var camera_modes = {ortho:'o', perspective: 'p'};
var camera_mode = camera_modes.ortho;

var Type = {
  cube: 'cube',
};

var geometries = {
  Type.cube: new THREE.BoxGeometry(world.unit, world.unit, world.unit),
}


withCamera = function(cases) {
  if (camera_mode === camera_modes.ortho) {
    return cases.ortho();
  } else if (camera_mode === camera_modes.perspective) {
    return cases.perspective();
  }
}

var initGL = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Stuff
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // Camera init
  camera = withCamera({
    ortho: function() {
      return new THREE.OrthographicCamera(
        width / -2, width / 2, height / 2, height / -2,
        1, 1000);
    },
    perspective: function() {
      return new THREE.PerspectiveCamera(75,
        width / height, 0.1, 1000 );
    },
  });

  camera.position.z = 500;

  scene.add(camera);

  window.addEventListener('resize', resizeHandler(camera, renderer), false);

  // Projector
  projector = new THREE.Projector();

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
  // Objects
  camera: camera,
  scene: scene,
  renderer: renderer,

  withCamera: withCamera,
  initGL: initGL,
  camera: camera
}
