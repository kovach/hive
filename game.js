// TODO
// 3d selection
// camera translation
// look at/away keybinding
//
// INVERSION??


var initGL = function(initFn, renderFn) {
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Stuff
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);


  // Camera init
  camera = new THREE.PerspectiveCamera(75,
      width / height, 0.1, 1000 );

  window.addEventListener('resize', resizeHandler(camera, renderer), false);

  // Projector
  projector = new THREE.Projector();

  var data = initFn(scene, camera, renderer);
}



blobs = _.map(_.range(22), randPoint);
blobs[0] = v(3, 0, 0);
blob_objects = [];
lights = _.map(_.range(6), randPoint);

makeSphere = function(geometry, material) {
  return function (p) {
    var s = new THREE.Mesh(geometry, material);
    s.position.set(p.x, p.y, p.z);

    blob_objects.push(s);
    scene.add(s);
  }
}
makeLight = function(v) {
  var light = new THREE.PointLight(0x222222);
  light.position.set(v.x, v.y, v.z);
  scene.add(light);
}


   

// Make the spheres
init = function(scene, camera, renderer) {
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  var geometry = new THREE.SphereGeometry(1, 40, 40);

  _.each(blobs, makeSphere(geometry, material));
  _.each(lights, makeLight);

  var arr_origin = camera.position.clone();
  //var arr_origin = blobs[0].clone();
  arrow = new THREE.ArrowHelper(v(1,0,0), arr_origin, 7, 0xff0000);
  scene.add(arrow);
}

var render = function() {
  requestAnimationFrame(render);

  updateAnimations();

  renderer.render(scene, camera);
}

initGL(init);

initHandlers();

render();
