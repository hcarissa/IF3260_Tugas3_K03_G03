function perspectiveProjDraw() {
  const perspectiveMatrix = getProjection(30, canvas.width / canvas.height, 1, 100);
  objectsArray.forEach(obj => {
    obj.projMatrix = perspectiveMatrix;
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  });
}

function orthoProjDraw() {
  const orthMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  const stMatrix = getSTMat(-1, 1, -1, 1, 1, 100);
  objectsArray.forEach(obj => {
    obj.projMatrix = matrixMultiply(orthMatrix, stMatrix);
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  });
}

function obliqueProjDraw() {
  const shtMat = [1, 0, 0, 0, 0, 1, 0, 0, 0.3, 0.3, 0, 0, 0, 0, 0, 1];
  objectsArray.forEach(obj => {
    obj.projMatrix = matrixMultiply(translation(0.6, 0.6, 0), shtMat);
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  });
}

function getSTMat(left, right, bottom, top, near, far) {
  const a = right - left;
  const b = top - bottom;
  const c = far - near;
  return [    2 / a, 0, 0, -(left + right) / a,    0, 2 / b, 0, -(top + bottom) / b,    0, 0, -2 / c, -(far + near) / c,    0, 0, 0, 1  ];
}

function getProjection(angle, aspect, zMin, zMax) {
  const top = Math.tan(degToRad(angle) / 2) * zMin;
  const right = top * aspect;
  return [    zMin / right, 0, 0, 0,    0, zMin / top, 0, 0,    0, 0, -(zMax + zMin) / (zMax - zMin), (-2 * zMax * zMin) / (zMax - zMin),    0, 0, -1, 0  ];
}
