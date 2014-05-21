// TODO
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



blobs = _.map(_.range(100), World.makeBlob);
blob_objects = [];
lights = _.map(_.range(7), function() { return World.randPoint(3); });

geometries = _.map(_.range(5), function(i) {
  var radius = 0.1 + i / 5 * 1.2;
  return { radius : radius
         , geometry : new THREE.SphereGeometry(radius, 40, 40)
         };
});

makeBlob = function (b) {
  //var geometry = new THREE.SphereGeometry(b.radius, 40, 40);
  var geometry = geometries[randInt(geometries.length)];
  b.radius = geometry.radius;
  var material = new THREE.MeshLambertMaterial({ color: World.blobColor });
  var s = new THREE.Mesh(geometry.geometry, material);

  s.position.copy(b.position);
  s._id = _.uniqueId();
  b._id = s._id;

  blob_objects.push(s);
  scene.add(s);
}
makeLight = function(v) {
  var light = new THREE.PointLight(0x222222);
  light.position.set(v.x, v.y, v.z);
  scene.add(light);
}
makeArrow = function() {
  var arr_origin = camera.position.clone();
  //var arr_origin = blobs[0].clone();
  arrow = new THREE.ArrowHelper(v(1,0,0), arr_origin, 7, 0xff0000);
  scene.add(arrow);
}


   

// Make the spheres
init = function(scene, camera, renderer) {

  _.each(blobs, makeBlob);
  _.each(lights, makeLight);

  //makeArrow();
}

var render = function() {
  requestAnimationFrame(render);

  updateAnimations();

  renderer.render(scene, camera);
}

initGL(init);
initHandlers();

render();
