// TODO


var initGL = function(initFn, renderFn) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75,
      window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 10;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', resizeHandler(camera, renderer), false);

  var data = initFn(scene, camera, renderer);
}

xyz = function(x, y, z) {
  return { x : x, y : y, z : z };
}
vec = function(p) {
  return new THREE.Vector3(p.x, p.y, p.z);
}

addLight = function(v) {
  var light = new THREE.PointLight(0x888888);
  light.position.set(v.x, v.y, v.z);
  scene.add(light);
}
var initLights = function() {
  addLight(xyz(0, 5, 0));
  addLight(xyz(0, -5, 0));
}

var render = function() {
  requestAnimationFrame(render);

  animations = _.filter(animations, function(a) {
    var t = normalizeTime(a);
    if (t > 1) {
      return false;
    } else {
      a.update(a.state, t);
      return true;
    }
  });

  renderer.render(scene, camera);
}


points = [xyz(0,0,0), xyz(3,0,0)];

init = function(scene, camera, renderer) {
  var basic_material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  //var geometry = new THREE.CubeGeometry(1,1,1);
  var geometry = new THREE.SphereGeometry(1, 22, 22);

  _.each(points, function(p) {
    var s = new THREE.Mesh(geometry, material);
    s.position.set(p.x, p.y, p.z);
    scene.add(s);
  });
}

initGL(init);

initKeyboard();
initLights();

//registerAnimation({ duration : 1000, type : 'test', init : 0 });

render();
