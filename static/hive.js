var scene;
var camera;
var renderer;

var camera_modes = {ortho:'o', perspective: 'p'};
var camera_mode = camera_modes.ortho;
//var camera_mode = camera_modes.perspective;

Color = {
  base02: 0x073642,
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
  if (camera_mode === camera_modes.ortho) {
    camera = new THREE.OrthographicCamera(
        width / -2, width / 2, height / 2, height / -2,
        1, 1000);
  } else if (camera_mode === camera_modes.perspective) {
    camera = new THREE.PerspectiveCamera(75,
        width / height, 0.1, 1000 );
  } else {
    console.log('ERROR hive.js: must select camera mode');
    return;
  }
  camera.position.z = 500;

  scene.add(camera);

  window.addEventListener('resize', resizeHandler(camera, renderer), false);

  // Projector
  projector = new THREE.Projector();

}


var initWorld = function(things) {
  var geometry = new THREE.BoxGeometry(world.unit, world.unit, world.unit);

  _.each(things, function(thing) {
    var material = new THREE.MeshBasicMaterial({color: 0xffffff});
    var cube = new THREE.Mesh(geometry, material);
    cube._id = thing.id;
    world.objects.push(cube);
    thing.object = cube;
    thing.update();
    scene.add(cube);
  });

  initHandlers();
  render();
}

var render = function() {
  requestAnimationFrame(render);


  //updateAnimations();

  renderer.render(scene, camera);
}

initGL();

send_init();

