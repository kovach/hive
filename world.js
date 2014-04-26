randPoint = function() {
  var b = 22;
  var xmax = b;
  var ymax = b;
  var zmax = b;

  return v( Math.random() * xmax - xmax / 2
          , Math.random() * ymax - ymax / 2
          , Math.random() * zmax - zmax / 2
          );
}
