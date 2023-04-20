var articulatedModel = {};
var vertices = [];
var oldAngle = 0;
var objects = [];
var anglex = 180;
var angley = 180;
var anglez = 180;
var dilate = 1;
var transx = 0;
var transy = 0;
var transz = 0;
var boolshade = 1;
var componentName = 'root';

function check(canvas) {
  let gl = ['experimental-webgl', 'webgl', 'moz-webgl'];
  let flag;
  for (let i = 0; i < gl.length; i++) {
    try {
      flag = canvas.getContext(gl[i]);
    }
    catch (e) { }
    if (flag) {
      break;
    }
  }
  if (!flag) {
    alert("Maaf, WebGL tidak tersedia di browser anda. Silahkan update browser Anda.");
  }
  return flag;
}
const vertexShaderText = `
attribute vec3 position;
attribute vec3 normal;
uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;
uniform mat4 Nmatrix;
attribute vec3 color;
varying vec3 vLighting;
varying vec3 vColor;
void main(void) {
    gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);
    vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    vec3 directionalLightColor = vec3(1, 1, 1);
    vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
    vec4 transformedNormal = Nmatrix*vec4(normal, 1.);
    
    float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
    vColor = color;
}
`;

const fragmentShaderText = 'precision mediump float;' +
  'varying vec3 vColor;' +
  'varying vec3 vLighting;' +

  'void main(void) {' +
  'gl_FragColor = vec4(vColor, 1.);' +
  'gl_FragColor.rgb *= vLighting;' +
  '}';
function createShader(gl, type, source) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('error!', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('error!', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  gl.validateProgram(program)
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('error validating program!', gl.getProgramInfoLog(program))
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}
function setGeometry(gl, vertices) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW);
}
function setColors(gl, colors) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(colors),
    gl.STATIC_DRAW);
}
var _Pmatrix;
var _Vmatrix;
var _Mmatrix;
var _Nmatrix;

// OBJECTS

var articulatedSeaweed = {
  children: [{
    name: 'root',
    pivotPosition: [0, -0.602, 0], // pivot for children
    vertexPositions: [
      // Front
      -0.101, -0.702, 0.103, 0.101, -0.702, 0.103, 0.101, -0.602, 0.103, -0.101, -0.602, 0.103,
      // Back
      -0.101, -0.702, -0.103, 0.101, -0.702, -0.103, 0.101, -0.602, -0.103, -0.101, -0.602, -0.103,
      // Top
      -0.101, -0.602, 0.103, 0.101, -0.602, 0.103, 0.101, -0.602, -0.103, -0.101, -0.602, -0.103,
      // Bottom
      -0.101, -0.702, 0.103, 0.101, -0.702, 0.103, 0.101, -0.702, -0.103, -0.101, -0.702, -0.103,
      // Right
      0.101, -0.702, -0.103, 0.101, -0.702, 0.103, 0.101, -0.602, 0.103, 0.101, -0.602, -0.103,
      // Left
      -0.101, -0.702, -0.103, -0.101, -0.702, 0.103, -0.101, -0.602, 0.103, -0.101, -0.602, -0.103,
    ],
    vertexNormals: [
      // Front
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      // Back
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      // Top
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      // Bottom
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      // Right
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      // Left
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    ],
    vertexColors: [
      // Front
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
      // Back
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
      // Top
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
      // Bottom
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
      // Right
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
      // Left
      0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
    ],
    animationFrames: [
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      {
        translation: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      }
    ],
    children: [
      {
        name: 'bottomleaf',
        pivotPosition: [0.0, 0.33, 0.0], // relative to parent, pivot for children
        vertexPositions: [
          // Front
          -0.031, 0, 0.103, 0.031, 0, 0.103, 0.021, 0.33, 0.093, -0.021, 0.33, 0.093,
          // Back
          -0.031, 0, -0.103, 0.031, 0, -0.103, 0.021, 0.33, -0.093, -0.021, 0.33, -0.093,
          // Top
          -0.021, 0.33, 0.093, 0.021, 0.33, 0.093, 0.021, 0.33, -0.093, -0.021, 0.33, -0.093,
          // Bottom
          -0.031, 0, 0.103, 0.031, 0, 0.103, 0.031, 0, -0.103, -0.031, 0, -0.103,
          // Right
          0.031, 0, -0.103, 0.031, 0, 0.103, 0.021, 0.33, 0.093, 0.021, 0.33, -0.093,
          // Left
          -0.031, 0, -0.103, -0.031, 0, 0.103, -0.021, 0.33, 0.093, -0.021, 0.33, -0.093,
        ],
        vertexNormals: [
          // Front
          0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
          // Back
          0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
          // Top
          0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
          // Bottom
          0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
          // Right
          1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
          // Left
          -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
        ],
        vertexColors: [
          // Front
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
          // Back
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
          // Top
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
          // Bottom
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
          // Right
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
          // Left
          0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
        ],
        animationFrames: [
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          }
        ],
        children: [
          {
            name: 'middleleaf',
            pivotPosition: [0.0, 0.334, 0.0], // relative to parent, pivot for children
            vertexPositions: [
              // Front
              -0.021, 0, 0.093, 0.021, 0, 0.093, 0.0251, 0.334, 0.103, -0.0251, 0.334, 0.103,
              // Back
              -0.021, 0, -0.093, 0.021, 0, -0.093, 0.0251, 0.334, -0.103, -0.0251, 0.334, -0.103,
              // Top
              -0.0251, 0.334, 0.103, 0.0251, 0.334, 0.103, 0.0251, 0.334, -0.103, -0.0251, 0.334, -0.103,
              // Bottom
              -0.021, 0, 0.093, 0.021, 0, 0.093, 0.021, 0, -0.093, -0.021, 0, -0.093,
              // Right
              0.021, 0, -0.093, 0.021, 0, 0.093, 0.0251, 0.334, 0.103, 0.0251, 0.334, -0.103,
              // Left
              -0.021, 0, -0.093, -0.021, 0, 0.093, -0.0251, 0.334, 0.103, -0.0251, 0.334, -0.103,
            ],
            vertexNormals: [
              // Front
              0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
              // Back
              0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
              // Top
              0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
              // Bottom
              0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
              // Right
              1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
              // Left
              -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            ],
            vertexColors: [
              // Front
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
              // Back
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
              // Top
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
              // Bottom
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
              // Right
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
              // Left
              0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
            ],
            animationFrames: [
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              {
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              }
            ],
            children: [
              {
                name: 'topleaf',
                pivotPosition: [0, 0, 0], // relative to parent, pivot for children
                vertexPositions: [
                  // Front
                  -0.0251, 0, 0.103, 0.0251, 0, 0.103, 0.011, 0.46, 0.083, -0.011, 0.46, 0.083,
                  // Back
                  -0.0251, 0, -0.103, 0.0251, 0, -0.103, 0.011, 0.46, -0.083, -0.011, 0.46, -0.083,
                  // Top
                  -0.011, 0.46, 0.083, 0.011, 0.46, 0.083, 0.011, 0.46, -0.083, -0.011, 0.46, -0.083,
                  // Bottom
                  -0.0251, 0, 0.103, 0.0251, 0, 0.103, 0.0251, 0, -0.103, -0.0251, 0, -0.103,
                  // Right
                  0.0251, 0, -0.103, 0.0251, 0, 0.103, 0.011, 0.46, 0.083, 0.011, 0.46, -0.083,
                  // Left
                  -0.0251, 0, -0.103, -0.0251, 0, 0.103, -0.011, 0.46, 0.083, -0.011, 0.46, -0.083,
                ],
                vertexNormals: [
                  // Front
                  0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  // Back
                  0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
                  // Top
                  0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                  // Bottom
                  0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
                  // Right
                  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
                  // Left
                  -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
                ],
                vertexColors: [
                  // Front
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                  // Back
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                  // Top
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                  // Bottom
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                  // Right
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                  // Left
                  0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12, 0.2, 0.27, 0.12,
                ],
                animationFrames: [
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  },
                  {
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                  }
                ],
                children: []
              }
            ]
          }
        ]
      }
    ]
  }]
};

articulatedModel = articulatedSeaweed;
//

const canvas = document.getElementById("canvas");
const gl = check(canvas);
var oldAngle = 0;
function combineVertexPositions(tempArr, node, pivot) {
  if (node === undefined) {
    return;
  } else {
    var tempArr2 = [];
    tempArr2.push(node.vertexPositions);
    tempArr2 = tempArr2.flat();

    for (var i = 0; i < node.vertexPositions.length; i += 3) {
      tempArr2[i] += pivot[0];
      tempArr2[i + 1] += pivot[1];
      tempArr2[i + 2] += pivot[2];
    }

    tempArr.push(tempArr2);

    var newPivot = [pivot[0] + node.pivotPosition[0], pivot[1] + node.pivotPosition[1], pivot[2] + node.pivotPosition[2]];

    for (var i = 0; i < node.children.length; i++) {
      combineVertexPositions(tempArr, node.children[i], newPivot);
    }
  }
}
function combineVertexColors(tempArr, node) {
  if (node === undefined) {
    return;
  } else {
    tempArr.push(node.vertexColors);
    for (var i = 0; i < node.children.length; i++) {
      combineVertexColors(tempArr, node.children[i]);
    }
  }
}
function combineVertexNormals(tempArr, node) {
  if (node === undefined) {
    return;
  } else {
    tempArr.push(node.vertexNormals);
    for (var i = 0; i < node.children.length; i++) {
      combineVertexNormals(tempArr, node.children[i]);
    }
  }
}

function setup() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  canvas.width = Math.round(95 / 100 * vw)
  canvas.height = Math.round(95 / 100 * vh)
  // Setup Shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
  var program = createProgram(gl, vertexShader, fragmentShader);
  var vertBuff = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff);

  var vertexPosTemp = [];

  // articulatedModel.children[0] is always root node
  combineVertexPositions(vertexPosTemp, articulatedModel.children[0], [0, 0, 0]);

  vertexPosTemp = vertexPosTemp.flat();

  setGeometry(gl, vertexPosTemp);

  // Create and store data into color buffer
  var color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

  var vertexColTemp = [];

  combineVertexColors(vertexColTemp, articulatedModel.children[0]);

  vertexColTemp = vertexColTemp.flat();

  setColors(gl, vertexColTemp);

  var normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);

  var vertexNormTemp = [];

  combineVertexNormals(vertexNormTemp, articulatedModel.children[0]);
  vertexNormTemp = vertexNormTemp.flat();

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormTemp), gl.STATIC_DRAW);

  _Pmatrix = gl.getUniformLocation(program, "Pmatrix");
  _Vmatrix = gl.getUniformLocation(program, "Vmatrix");
  _Mmatrix = gl.getUniformLocation(program, "Mmatrix");
  _Nmatrix = gl.getUniformLocation(program, "Nmatrix");

  gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff);
  var _position = gl.getAttribLocation(program, "position");
  gl.vertexAttribPointer(_position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_position);

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  var _color = gl.getAttribLocation(program, "color");
  gl.vertexAttribPointer(_color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_color);

  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
  var _normal = gl.getAttribLocation(program, "normal");
  gl.vertexAttribPointer(_normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_normal);

  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearColor(1, 1, 1, 1);
  gl.clearDepth(1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

document.getElementById("shading").addEventListener("change", () => {
  if (boolshade == 0) {
    boolshade = 1;
    for (var i = 0; i < objects.length; i++) {
      draw(objects[i]);
    }
  } else {
    boolshade = 0
    for (var i = 0; i < objects.length; i++) {
      draw(objects[i]);
    }
  }
})

var distance = document.getElementById("distance").value;
var camera_height = 0.05
var view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -camera_height, distance, 1];
// draw object
function draw(object) {
  const proj_matrix = object.projMatrix;
  const model_matrix = object.modelMatrix;
  if (object.name == "root") start = 0;
  if (object.name == "bottomleaf") start = 3 * 2;
  if (object.name == "middleleaf") start = 3 * 4;
  // if (object.name == "topleaf") start = 3 * 6;
  const end = object.end;
  console.log("Drawing " + object.name);

  const fov = 75 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const near = 0.1;
  const far = 30;

  const projectionType = document.getElementById('projection').value;

  if (projectionType === "perspective") {
    perspective(proj_matrix, fov, aspect, near, far);
  } else if (projectionType === "orthographic") {
    orthographic(proj_matrix, -aspect, aspect, -1.0, 1.0, near, far);
  } else if (projectionType === "oblique") {
    oblique(proj_matrix, 75, 80);
  }

  setup();
  
  gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix);
  gl.uniformMatrix4fv(_Vmatrix, false, view_matrix);
  gl.uniformMatrix4fv(_Mmatrix, false, model_matrix);
  let normalMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (boolshade == 1) {
    normalMatrix = invert(multiply(view_matrix, model_matrix));
    transpose(normalMatrix, normalMatrix);
  }
  gl.uniformMatrix4fv(_Nmatrix, false, normalMatrix);

  for (var i = start; i < end; i++) {
    gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
  }

  for (let i = 0; i < object.children.length; i++) {
    console.log("As " + object.name + ", drawing: " + object.children[i].name);
    draw(object.children[i]);
  }
}

function setUpInitScene() {
  updateAngleY();

  var proj_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  var model_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  const rootModel = articulatedModel.children[0];

  var vertexPosTemp = [];
  combineVertexPositions(vertexPosTemp, articulatedModel.children[0], [0, 0, 0]);
  vertexPosTemp = vertexPosTemp.flat();

  var vertexColTemp = [];
  combineVertexColors(vertexColTemp, articulatedModel.children[0]);
  vertexColTemp = vertexColTemp.flat();

  var vertexNorTemp = [];
  combineVertexNormals(vertexNorTemp, articulatedModel.children[0]);
  vertexNorTemp = vertexNorTemp.flat();

  for (let i = 0; i < rootModel.vertexPositions.length / 12; i++) {
    for (let j = 0; j < 4; j++) {
      vertices.push(rootModel.vertexPositions[i * 12 + j * 3]);
      vertices.push(rootModel.vertexPositions[i * 12 + j * 3 + 1]);
      vertices.push(rootModel.vertexPositions[i * 12 + j * 3 + 2]);
    }
  }

  const numVertices = rootModel.vertexPositions.length / 3;

  // Root object
  const rootObject = {
    name: rootModel.name,
    offset: 0,
    end: numVertices,
    numVertices: numVertices,
    vertices: vertices,
    color: rootModel.vertexColors,
    normals: rootModel.vertexNormals,
    projMatrix: proj_matrix,
    modelMatrix: model_matrix,
    pivotPosition: rootModel.pivotPosition,
    animationFrames: rootModel.animationFrames,
    children: []
  };

  objects.push(rootObject);

  function createChildObjects(parentObject, parentModel) {

    for (let i = 0; i < parentModel.children.length; i++) {
      const childModel = parentModel.children[i];

      const childObject = {
        name: childModel.name,
        offset: 0,
        end: childModel.vertexPositions.length / 3,
        numVertices: childModel.vertexPositions.length / 3,
        vertices: vertices,
        color: childModel.vertexColors,
        normals: childModel.vertexNormals,
        projMatrix: proj_matrix,
        modelMatrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        pivotPosition: childModel.pivotPosition,
        animationFrames: childModel.animationFrames,
        children: []
      };

      console.log("created " + childObject.name + " with offset " + childObject.offset + " and end " + childObject.end);
      parentObject.children.push(childObject);

      createChildObjects(childObject, childModel);
    }
  }

  createChildObjects(rootObject, rootModel);

  // Draw
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }

  oldAngle = 0;
  document.getElementById('angle').value = oldAngle;
}

function yRotate(angleInRadians) {
  return [
    Math.cos(angleInRadians), 0, Math.sin(angleInRadians), 0,
    0, 1, 0, 0,
    -Math.sin(angleInRadians), 0, Math.cos(angleInRadians), 0,
    0, 0, 0, 1,
  ];
}

function multiply(a, b) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[i * 4 + k] * b[k * 4 + j];
      }
      result[i * 4 + j] = sum;
    }
  }
  return result;
}

function updateAngleY() {
  let value = document.getElementById('angle').value;
  value = value * Math.PI / 180;
  let move = value - oldAngle;
  let product = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      let sum = 0;
      for (var k = 0; k < 4; k++)
        sum = sum + yRotate(move)[i * 4 + k] * view_matrix[k * 4 + j];
      product[i * 4 + j] = sum;
    }
  }
  view_matrix = product;
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }
  oldAngle = value;
}

const invert = (matin) => {
  let matout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let a00 = matin[0];
  let a01 = matin[1];
  let a02 = matin[2];
  let a03 = matin[3];
  let a10 = matin[4];
  let a11 = matin[5];
  let a12 = matin[6];
  let a13 = matin[7];
  let a20 = matin[8];
  let a21 = matin[9];
  let a22 = matin[10];
  let a23 = matin[11];
  let a30 = matin[12];
  let a31 = matin[13];
  let a32 = matin[14];
  let a33 = matin[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;

  matout[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  matout[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  matout[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  matout[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  matout[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  matout[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  matout[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  matout[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  matout[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  matout[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  matout[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  matout[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  matout[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  matout[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  matout[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  matout[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return matout;
};

const transpose = (out, a) => {
  // Self-tranpose
  if (out === a) {
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a12 = a[6];
    let a13 = a[7];
    let a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;

  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

const perspective = (out, fovy, aspect, near, far) => {
  let f = 1.0 / Math.tan(fovy / 2);

  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    out[10] = (far + near) / (near - far);
    out[14] = 2 * far * near / (near - far);
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

const orthographic = (out, left, right, bottom, top, near, far) => {
  let l_r = 1 / (left - right);
  let b_t = 1 / (bottom - top);
  let n_f = 1 / (near - far);

  out[0] = -2 * l_r;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * b_t;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * n_f;
  out[11] = 0;
  out[12] = (left + right) * l_r;
  out[13] = (top + bottom) * b_t;
  out[14] = (far + near) * n_f;
  out[15] = 1;

  return out;
}

const oblique = (out, theta, phi) => {
  var t = theta * Math.PI / 180;
  var p = phi * Math.PI / 180;
  var cotT = -1 / Math.tan(t);
  var cotP = -1 / Math.tan(p);

  out[0] = 1;
  out[1] = 0;
  out[2] = cotT;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = cotP;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  transpose(out, out);

  return out;
}

function componentHandler() {
  componentName = document.getElementById("select-component").value;
}

function modelHandler() {
  var modelName = document.getElementById("model").value;
  if (modelName == "pyramid") {
    articulatedModel = articulatedSeaweed;
  } else if (modelName == "hollow-cube") {
    articulatedModel = articulatedSeaweed;
  } else {
    articulatedModel = articulatedSeaweed;
  }
  setup();
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }
}

function projectionHandler() {
  projectionType = document.getElementById("projection").value;
  if (projectionType == "orthographic") {
    distance = -1.3;
    view_matrix[14] = distance;
  } else if (projectionType == "oblique") {
    distance = 0;
    view_matrix[14] = distance;
  } else {
    distance = -1.3;
    view_matrix[14] = distance;
  }

  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }

}

function distanceHandler() {
  projectionType = document.getElementById("projection").value;
  if (projectionType == "perspective") {
    distance = document.getElementById("distance").value;
    view_matrix[14] = distance;

    for (var i = 0; i < objects.length; i++) {
      draw(objects[i]);
    }
  }
}

function resetHandler() {
  updateTranslate(objects[0], 'x', -document.getElementById("translation-x").value);
  updateTranslate(objects[0], 'y', -document.getElementById("translation-y").value);
  updateTranslate(objects[0], 'z', -document.getElementById("translation-z").value);
  transx = 0;
  transy = 0;
  transz = 0;

  document.getElementById("translation-x").value = 0;
  document.getElementById("translation-y").value = 0;
  document.getElementById("translation-z").value = 0;

  document.getElementById("projection").value = "perspective";
  document.getElementById("distance").value = -1.3;
  document.getElementById("angle").value = 0;

  projectionHandler();
  updateAngleY();

}

function getCenterPoint(start, end, arr) {
  let maxX = -Infinity;
  let minX = Infinity;
  let maxY = -Infinity;
  let minY = Infinity;

  for (let i = start; i < end; i += 3) {
    maxX = Math.max(maxX, arr[i]);
    minX = Math.min(minX, arr[i]);
    maxY = Math.max(maxY, arr[i + 1]);
    minY = Math.min(minY, arr[i + 1]);
  }

  const centerX = (maxX + minX) / 2;
  const centerY = (maxY + minY) / 2;
  return [centerX, centerY];
}
function translation(tx, ty, tz) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1,
  ];
}

function scale(sx, sy, sz) {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  ];
}
function rotateX(rad) {
  return [
    1, 0, 0, 0,
    0, Math.cos(rad), -Math.sin(rad), 0,
    0, Math.sin(rad), Math.cos(rad), 0,
    0, 0, 0, 1
  ];
}

function rotateY(rad) {
  return [
    Math.cos(rad), 0, Math.sin(rad), 0,
    0, 1, 0, 0,
    -Math.sin(rad), 0, Math.cos(rad), 0,
    0, 0, 0, 1
  ]
}

function rotateZ(rad) {
  return [
    Math.cos(rad), -Math.sin(rad), 0, 0,
    Math.sin(rad), Math.cos(rad), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
}

function rotationMatrix(x, y, z) {
  // x : deg, y : deg, z : deg

  // get radian value
  x *= Math.PI / 180;
  y *= Math.PI / 180;
  z *= Math.PI / 180;

  // get rotation matrix
  var matx = rotateX(x);
  var maty = rotateY(y);
  var matz = rotateZ(z);

  // 
  return multiply(matx, multiply(maty, matz));
}
function updateTranslate(obj, axis, value) {
  var idx = 0;
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name == obj) {
      idx = i;
      break;
    }
  }
  if (axis == 'x') {
    var model_matrix = translation(value, 0, 0);
  }
  else if (axis == 'y') {
    var model_matrix = translation(0, value, 0);
  }
  else if (axis == 'z') {
    var model_matrix = translation(0, 0, value);
  }

  let currentModelMatrix = objects[idx].modelMatrix;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      let sum = 0;
      for (var k = 0; k < 4; k++)
        sum = sum + currentModelMatrix[i * 4 + k] * model_matrix[k * 4 + j];
      objects[idx].modelMatrix[i * 4 + j] = sum;
    }
  }
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }
}
function updateRotation(obj, x, y, z) {
  var idx = 0;
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name == obj) {
      idx = i;
      break;
    }
  }
  let centerPoint = getCenterPoint(objects[idx].offset * 12, objects[idx].offset * 12 + objects[idx].numVertices * 3, vertices);
  var translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
  var translate_matrix2 = translation(centerPoint[0], centerPoint[1], 0);
  var rotation_matrix = rotationMatrix(x, y, z);

  var trans = multiply(translate_matrix1, multiply(rotation_matrix, translate_matrix2));
  objects[idx].modelMatrix = multiply(trans, objects[idx].modelMatrix)

  for (var i = 0; i < objects.length; i++) {
    draw(objects[i]);
  }
}

function updateScale(object, value, flag) {
  // recursively try to find the object with the name of componentName within its children as well
  // if found, do the updateScale on object
  if (object.name == componentName || flag) {
    let centerPoint = getCenterPoint(object.offset * 12, object.offset * 12 + object.numVertices * 3, vertices);
    var translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
    var translate_matrix2 = translation(centerPoint[0], centerPoint[1], 0);
    var scale_matrix = scale(value, value, value);
    const product = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        let sum = 0;
        for (var k = 0; k < 4; k++)
          sum = sum + scale_matrix[i * 4 + k] * translate_matrix2[k * 4 + j];
        product[i * 4 + j] = sum;
      }
    }
    const model_matrix = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        let sum2 = 0;
        for (var k = 0; k < 4; k++)
          sum2 = sum2 + translate_matrix1[i * 4 + k] * product[k * 4 + j];
        model_matrix[i * 4 + j] = sum2;
      }
    }
    const currentModelMatrix = object.modelMatrix;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        let sum3 = 0;
        for (var k = 0; k < 4; k++)
          sum3 = sum3 + model_matrix[i * 4 + k] * currentModelMatrix[k * 4 + j];
        object.modelMatrix[i * 4 + j] = sum3;
      }
    }
    // Update scale for all children
    for (var i = 0; i < object.children.length; i++) {
      updateScale(object.children[i], value, true);
    }
    if (!flag) {
      console.log("Drawing as parent");
      draw(object);
    }
    return;
  } else if (object.children) {
    for (var i = 0; i < object.children.length; i++) {
      updateScale(object.children[i], value, false);
    }
  }
}

const scaleInput = document.getElementById('scale');
//translation
const xTranslation = document.getElementById('translation-x');
const yTranslation = document.getElementById('translation-y');
const zTranslation = document.getElementById('translation-z');
//rotation
const rotXInput = document.getElementById('rotation-x');
const rotYInput = document.getElementById('rotation-y');
const rotZInput = document.getElementById('rotation-z');
xTranslation.addEventListener('input', () => {
  const xValue = xTranslation.value;
  const deltatransx = xValue - transx;
  transx = xValue;
  updateTranslate(objects[0], 'x', deltatransx);
});
yTranslation.addEventListener('input', () => {
  const yValue = yTranslation.value;
  const deltatransy = yValue - transy;
  transy = yValue;
  updateTranslate(objects[0], 'y', deltatransy);
});

zTranslation.addEventListener('input', () => {
  const zValue = zTranslation.value;
  const deltatransz = zValue - transz;
  transz = zValue;
  updateTranslate(objects[0], 'z', deltatransz);

});
scaleInput.addEventListener('input', () => {
  const scaleValue = scaleInput.value;
  const deltascale = scaleValue / dilate;
  dilate = scaleValue;
  updateScale(objects[0], deltascale, false);
});
rotXInput.addEventListener('input', () => {
  const rotxValue = rotXInput.value;
  const deltarotx = rotxValue - anglex;
  anglex = rotxValue;
  updateRotation(objects[0], deltarotx, 0, 0)
})
rotYInput.addEventListener('input', () => {
  const rotyValue = rotYInput.value;
  const deltaroty = rotyValue - angley;
  angley = rotyValue;
  updateRotation(objects[0], 0, deltaroty, 0)
})
rotZInput.addEventListener('input', () => {
  const rotzValue = rotZInput.value;
  const deltarotz = rotzValue - anglez;
  anglez = rotzValue;
  updateRotation(objects[0], 0, 0, deltarotz)
})

function save() {
  const object = JSON.stringify(objects, null, 4);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(object)}`;
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', dataUri);
  downloadLink.setAttribute('download', 'model.json');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
const fileUpload = document.getElementById("load");
fileUpload.addEventListener("change", importData);

async function importData() {
  if (fileUpload.value !== "") {
    const path = (window.URL || window.webkitURL).createObjectURL(fileUpload.files[0]);
    await initModel(path);
  }
}
async function initModel(filename) {
  const modelJson = await loadFile(filename);
  var parsedJson = JSON.parse(modelJson);
  if (Array.isArray(parsedJson) && parsedJson[0].offset !== undefined) {
    objects = parsedJson;
    const reset = document.getElementById("reset-button");
    reset.click();
    setup();
    for (let i = 0; i < objects.length; i++) {
      draw(objects[i]);
    }
  } else {
    articulatedModel = parsedJson;
    const reset = document.getElementById("reset-button");
    reset.click();
  }
}

const loadFile = async (filename) => {
  return await fetchFile(filename);
};

async function fetchFile(filename) {
  return await fetch(filename).then((res) => res.text());
};


setup();
setUpInitScene();