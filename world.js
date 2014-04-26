randPoint = function() {
  var xmax = 100;
  var ymax = 100;
  var zmax = 100;

  return v( Math.random() * xmax - xmax / 2
          , Math.random() * ymax - ymax / 2
          , Math.random() * zmax - zmax / 2
          );
}
