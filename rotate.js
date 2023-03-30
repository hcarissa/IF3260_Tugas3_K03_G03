function RotateX(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ];
}

function RotateY(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ];
}

function RotateZ(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

function rotateObjectX(value){
  const selectedObjIdx = getObjIdx(objectChosen);
  const selectedObject = objectsArray[selectedObjIdx];

  const centerPoint = getCenterPoint(selectedObject.offset * 12, selectedObject.offset * 12 + selectedObject.numVertices * 3, vertices);
  const translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
  const translate_matrix2 = translation(centerPoint[0], -0, 0);

  let rotateValue, model_matrix;
  rotateValue = value - rotX;
  model_matrix = matrixMultiply(translate_matrix1, matrixMultiply(RotateX(rotateValue), translate_matrix2));
  rotX = value;
  selectedObject.modelMatrix = matrixMultiply(model_matrix, selectedObject.modelMatrix);

  for (const obj of objectsArray) {
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  }
}

function rotateObjectY(value){
  const selectedObjIdx = getObjIdx(objectChosen);
  const selectedObject = objectsArray[selectedObjIdx];

  const centerPoint = getCenterPoint(selectedObject.offset * 12, selectedObject.offset * 12 + selectedObject.numVertices * 3, vertices);
  const translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
  const translate_matrix2 = translation(centerPoint[0], -0, 0);

  let rotateValue, model_matrix;
  rotateValue = value - rotY;
  model_matrix = matrixMultiply(translate_matrix1, matrixMultiply(RotateY(rotateValue), translate_matrix2));
  rotY = value;
  selectedObject.modelMatrix = matrixMultiply(model_matrix, selectedObject.modelMatrix);

  for (const obj of objectsArray) {
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  }
}

function rotateObjectZ(value){
  const selectedObjIdx = getObjIdx(objectChosen);
  const selectedObject = objectsArray[selectedObjIdx];

  const centerPoint = getCenterPoint(selectedObject.offset * 12, selectedObject.offset * 12 + selectedObject.numVertices * 3, vertices);
  const translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
  const translate_matrix2 = translation(centerPoint[0], -0, 0);

  let rotateValue, model_matrix;
  rotateValue = value - rotZ;
  model_matrix = matrixMultiply(translate_matrix1, matrixMultiply(RotateZ(rotateValue), translate_matrix2));
  rotZ = value;
  selectedObject.modelMatrix = matrixMultiply(model_matrix, selectedObject.modelMatrix);

  for (const obj of objectsArray) {
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  }
}
