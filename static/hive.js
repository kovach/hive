var handlers = require('./handlers.js');

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

  window.addEventListener('resize',
      handlers.resizeHandler(camera, renderer), false);

  // Projector
  projector = new THREE.Projector();
}

var initWorld = function(things, world) {
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

module.exports = {
  initGL: initGL,
  initWorld: initWorld,
  render: render,
}

//initGL();
//send_init();
