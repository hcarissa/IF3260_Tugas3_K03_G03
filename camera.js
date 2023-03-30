function updateZoom(value) {
  view_matrix = matrixMultiply(scale(value, value, value), view_matrix);
  for (var i = 0; i < objectsArray.length; i++) {
    draw(
      objectsArray[i].projMatrix,
      objectsArray[i].modelMatrix,
      objectsArray[i].offset,
      objectsArray[i].end
    );
  }
}

function updateHView() {
  let value = document.getElementById("angleX").value;
  value = degToRad(value);

  let move = value - oldValueMove;

  view_matrix = matrixMultiply(yRotation(move), view_matrix);
  for (let i = 0; i < objectsArray.length; i++) {
    draw(
      objectsArray[i].projMatrix,
      objectsArray[i].modelMatrix,
      objectsArray[i].offset,
      objectsArray[i].end
    );
  }
  oldValueMove = value;
}

function updateVView() {
  let value = document.getElementById("angleY").value;
  value = degToRad(value);

  let move = value - oldValueMove;

  view_matrix = matrixMultiply(xRotation(move), view_matrix);
  for (let i = 0; i < objectsArray.length; i++) {
    draw(
      objectsArray[i].projMatrix,
      objectsArray[i].modelMatrix,
      objectsArray[i].offset,
      objectsArray[i].end
    );
  }
  oldValueMove = value;
}

function yRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1];
}

function xRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
 
    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  }

  function degToRad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }