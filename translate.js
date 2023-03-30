function translation(tx, ty, tz){
    return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1,
    ];
}

function translateObject(axis, value) {
    const selectedObjectIdx = getObjIdx(objectChosen);
  
    const model_matrix = (axis == 'x') ? translation(value, 0, 0) : translation(0, value, 0);
  
    objectsArray[selectedObjectIdx].modelMatrix = matrixMultiply(objectsArray[selectedObjectIdx].modelMatrix, model_matrix);
  
    for (const obj of objectsArray) {
      draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
    }
  }
