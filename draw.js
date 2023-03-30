var _Pmatrix;
var _Vmatrix;
var _Mmatrix;
var _Nmatrix;

function setUpBuffer() {
  // Create and store data into vertex buffer
  const vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Create and store data into color buffer
  const color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

  // Associating attributes to vertex shader
  _Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
  _Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
  _Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");
  _Nmatrix = gl.getUniformLocation(shaderProgram, "Nmatrix");

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  const _position = gl.getAttribLocation(shaderProgram, "position");
  gl.vertexAttribPointer(_position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_position);

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  const _color = gl.getAttribLocation(shaderProgram, "color");
  gl.vertexAttribPointer(_color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_color);

  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
  const _normal = gl.getAttribLocation(shaderProgram, "normal");
  gl.vertexAttribPointer(_normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_normal);

  gl.useProgram(shaderProgram);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearColor(0, 0, 0, 0);
  gl.clearDepth(1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

let view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function draw(proj_matrix, model_matrix, start, end) {
  gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix);
  gl.uniformMatrix4fv(_Vmatrix, false, view_matrix);
  gl.uniformMatrix4fv(_Mmatrix, false, model_matrix);

  if (isShading) {
    shading(model_matrix, view_matrix);
  } else {
    const normalMatrix = new Float32Array(16);
    gl.uniformMatrix4fv(_Nmatrix, false, normalMatrix);
  }

  for (let i = start; i < end; i++) {
    gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
  }
}

function setUpInitScene() {
  var proj_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  var model_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

   objectsArray.push({
     name: "cube",
     offset: 0,
     end: 24,
     numVertices: 96,
     vertices: vertices.slice(0, 96 * 3),
     color: colors.slice(0, 96 * 3),
     normals: vertexNormals.slice(0, 96 * 3),
     projMatrix: proj_matrix,
     modelMatrix: model_matrix,
   });

  objectsArray.push({
    name: "tetrahedral",
    offset: 24,
    end: 40,
    numVertices: 64,
    vertices: vertices.slice(96 * 3, 96 * 3 + 64 * 3),
    color: colors.slice(96 * 3, 96 * 3 + 64 * 3),
    normals: vertexNormals.slice(96 * 3, 96 * 3 + 64 * 3),
    projMatrix: proj_matrix,
    modelMatrix: model_matrix,
  });

  objectsArray.push({
    name: "prism",
    offset: 40,
    end: 60,
    numVertices: 80,
    vertices: vertices.slice(96 * 3 + 64 * 3, 96 * 3 + 64 * 3 + 80 * 3),
    color: colors.slice(96 * 3 + 64 * 3, 96 * 3 + 64 * 3 + 80 * 3),
    normals: vertexNormals.slice(96 * 3 + 64 * 3, 96 * 3 + 64 * 3 + 80 * 3),
    projMatrix: proj_matrix,
    modelMatrix: model_matrix,
  });

objectsArray.forEach((object) => {
  draw(object.projMatrix, object.modelMatrix, object.offset, object.end);
});
}

function reset() {
  const projMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  objectsArray.forEach((object) => {
    object.projMatrix = projMatrix;
    object.modelMatrix = view_matrix;
    draw(object.projMatrix, object.modelMatrix, object.offset, object.end);
  });

  oldValueMove = 0;
  document.getElementById("angle").value = oldValueMove;
}

function updateShading() {
  const checkbox = document.getElementById('shader');
  isShading = checkbox.checked;

  objectsArray.forEach((obj) => {
    draw(obj.projMatrix, obj.modelMatrix, obj.offset, obj.end);
  });
}

function shading(modelMatrix, viewMatrix) {
  const temp = matrixMultiply(modelMatrix, viewMatrix);
  const mvMatrix = temp.slice(0, 16).reduce((matrix, val, i) => {
    const row = Math.floor(i / 4);
    matrix[row] = matrix[row] || [];
    matrix[row].push(val);
    return matrix;
  }, []);
  
  const normalMatrix = matrixTranspose(matrixInvert(mvMatrix));
  const normalVector = normalMatrix.flat();
  gl.uniformMatrix4fv(_Nmatrix, false, normalVector);
}

function setUpBufferFromObjects() {
  // Create and store data into vertex buffer
  const vertex_buffer = createBufferFromData(objectsArray.flatMap(obj => obj.vertices));
  bindBufferToAttribute(vertex_buffer, "position", 3);

  // Create and store data into color buffer
  const color_buffer = createBufferFromData(objectsArray.flatMap(obj => obj.color));
  bindBufferToAttribute(color_buffer, "color", 3);

  // Create and store data into normal buffer
  const normal_buffer = createBufferFromData(objectsArray.flatMap(obj => obj.normals));
  bindBufferToAttribute(normal_buffer, "normal", 3);

  // Set up matrices and enable depth testing
  const { Pmatrix, Vmatrix, Mmatrix, Nmatrix } = getUniformLocations();
  useProgramAndEnableDepthTesting();
  
  // Set clear color, depth, and viewport
  setClearColorAndDepth(0, 0, 0, 0, 1.0);
  setViewport(0, 0, canvas.width, canvas.height);

  // Helper functions
  function createBufferFromData(data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
  }

  function bindBufferToAttribute(buffer, attribute, size) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const location = gl.getAttribLocation(shaderProgram, attribute);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
  }

  function getUniformLocations() {
    return {
      Pmatrix: gl.getUniformLocation(shaderProgram, "Pmatrix"),
      Vmatrix: gl.getUniformLocation(shaderProgram, "Vmatrix"),
      Mmatrix: gl.getUniformLocation(shaderProgram, "Mmatrix"),
      Nmatrix: gl.getUniformLocation(shaderProgram, "Nmatrix")
    };
  }

  function useProgramAndEnableDepthTesting() {
    gl.useProgram(shaderProgram);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  function setClearColorAndDepth(r, g, b, a, depth) {
    gl.clearColor(r, g, b, a);
    gl.clearDepth(depth);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  function setViewport(x, y, width, height) {
    gl.viewport(x, y, width, height);
  }
}


setUpBuffer();
setUpInitScene();