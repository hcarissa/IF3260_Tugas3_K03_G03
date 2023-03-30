function updateScale(value){
    const selectedObjectIdx = getObjIdx(objectChosen);
    const selectedObject = objectsArray[selectedObjectIdx];
    
    const objStart = selectedObject.offset*12;
    const objEnd = objStart + selectedObject.numVertices * 3;
    const centerPoint = getCenterPoint(objStart, objEnd, vertices);

    const trans1 = translation(-centerPoint[0], -centerPoint[1], 0);
    const trans2 = translation(centerPoint[0], centerPoint[1], 0);
    const scaleMatrix = scale(value, value, value);
    const modelMatrix = matrixMultiply(trans1, matrixMultiply(scaleMatrix, trans2));

    const currentModel = selectedObject.modelMatrix;
    selectedObject.modelMatrix = matrixMultiply(modelMatrix, currentModel);

    for (const obj of objectsArray) {
      draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
    }
 }


function scale(sx, sy, sz) {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
 }