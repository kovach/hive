xyz = function(x, y, z) {
  return { x : x, y : y, z : z };
}
vec = function(p) {
  return new THREE.Vector3(p.x, p.y, p.z);
}
v = function(x, y, z) {
  return new THREE.Vector3(x, y, z);
}
randInt = function(max) {
 return Math.floor((Math.random()*max)); 
}
id = function(x) { return x; }

xy = function(x, y) {
  return new THREE.Vector3(x,y,0);
}

module.exports = {
  xyz: xyz,
  v: v,
  randInt, randInt,
  id, id,
  xy, xy,
}

