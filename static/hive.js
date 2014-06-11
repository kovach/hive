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
