var hollowModel = {};
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

// human
// head
var headanglex = 180;
var headangley = 180;
var headanglez = 180;
var headdilate = 1;
var headtransx = 0;
var headtransy = 0;
var headtransz = 0;

// left upper arm
var leftupperarmanglex = 180;
var leftupperarmangley = 180;
var leftupperarmanglez = 180;
var leftupperarmdilate = 1;
var leftupperarmtransx = 0;
var leftupperarmtransy = 0;
var leftupperarmtransz = 0;

// right upper arm
var rightupperarmanglex = 180;
var rightupperarmangley = 180;
var rightupperarmanglez = 180;
var rightupperarmdilate = 1;
var rightupperarmtransx = 0;
var rightupperarmtransy = 0;
var rightupperarmtransz = 0;

// left upper leg
var leftupperleganglex = 180;
var leftupperlegangley = 180;
var leftupperleganglez = 180;
var leftupperlegdilate = 1;
var leftupperlegtransx = 0;
var leftupperlegtransy = 0;
var leftupperlegtransz = 0;

// right upper leg
var rightupperleganglex = 180;
var rightupperlegangley = 180;
var rightupperleganglez = 180;
var rightupperlegdilate = 1;
var rightupperlegtransx = 0;
var rightupperlegtransy = 0;
var rightupperlegtransz = 0;

// left lower arm
var leftlowerarmanglex = 180;
var leftlowerarmangley = 180;
var leftlowerarmanglez = 180;
var leftlowerarmdilate = 1;
var leftlowerarmtransx = 0;
var leftlowerarmtransy = 0;
var leftlowerarmtransz = 0;

// right lower arm
var rightlowerarmanglex = 180;
var rightlowerarmangley = 180;
var rightlowerarmanglez = 180;
var rightlowerarmdilate = 1;
var rightlowerarmtransx = 0;
var rightlowerarmtransy = 0;
var rightlowerarmtransz = 0;

// left lower leg
var leftlowerleganglex = 180;
var leftlowerlegangley = 180;
var leftlowerleganglez = 180;
var leftlowerlegdilate = 1;
var leftlowerlegtransx = 0;
var leftlowerlegtransy = 0;
var leftlowerlegtransz = 0;

// right lower leg
var rightlowerleganglex = 180;
var rightlowerlegangley = 180;
var rightlowerleganglez = 180;
var rightlowerlegdilate = 1;
var rightlowerlegtransx = 0;
var rightlowerlegtransy = 0;
var rightlowerlegtransz = 0;

// seaweed
// bottomleaf
var bottomleafanglex = 180;
var bottomleafangley = 180;
var bottomleafanglez = 180;
var bottomleafdilate = 1;
var bottomleaftransx = 0;
var bottomleaftransy = 0;
var bottomleaftransz = 0;

// middleleaf
var middleleafanglex = 180;
var middleleafangley = 180;
var middleleafanglez = 180;
var middleleafdilate = 1;
var middleleaftransx = 0;
var middleleaftransy = 0;
var middleleaftransz = 0;

// topleaf
var topleafanglex = 180;
var topleafangley = 180;
var topleafanglez = 180;
var topleafdilate = 1;
var topleaftransx = 0;
var topleaftransy = 0;
var topleaftransz = 0;

//cow
//head
var HeadCAngleX = 180;
var HeadCAngleY = 180;
var HeadCAngleZ = 180;
var HeadCDilate = 1;
var HeadCTransX = 0;
var HeadCTransY = 0;
var HeadCTransZ = 0;

//leftfrontleg
var LeftFrontAngleX = 180;
var LeftFrontAngleY = 180;
var LeftFrontAngleZ = 180;
var LeftFrontDilate = 1;
var LeftFrontTransX = 0;
var LeftFrontTransY = 0;
var LeftFrontTransZ = 0;

//leftbackleg
var LeftBackAngleX = 180;
var LeftBackAngleY = 180;
var LeftBackAngleZ = 180;
var LeftBackDilate = 1;
var LeftBackTransX = 0;
var LeftBackTransY = 0;
var LeftBackTransZ = 0;

//rightfrontleg
var RightFrontAngleX = 180;
var RightFrontAngleY = 180;
var RightFrontAngleZ = 180;
var RightFrontDilate = 1;
var RightFrontTransX = 0;
var RightFrontTransY = 0;
var RightFrontTransZ = 0;

//rightbackleg
var RightBackAngleX = 180;
var RightBackAngleY = 180;
var RightBackAngleZ = 180;
var RightBackDilate = 1;
var RightBackTransX = 0;
var RightBackTransY = 0;
var RightBackTransZ = 0;



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

// ======================================================
// ARTICULATED MODELS
// ======================================================
var leftlowerarm = {
  name : "leftlowerarm",
  vertexPositions : [
      // Front
      -0.05, 0.125, 0.05,
      -0.05, -0.125, 0.05,
      0.05, -0.125, 0.05,
      0.05, 0.125, 0.05,

      // Top
      -0.05, 0.125, -0.05,
      -0.05, 0.125, 0.05,
      0.05, 0.125, 0.05,
      0.05, 0.125, -0.05,
      
      // Right
      0.05, 0.125, 0.05, 
      0.05, -0.125, 0.05,
      0.05, -0.125, -0.05,
      0.05, 0.125, -0.05,

      // Bottom,
      -0.05, -0.125, 0.05,
      -0.05, -0.125, -0.05,
      0.05, -0.125, -0.05, 
      0.05, -0.125, 0.05,

      // Left
      -0.05, 0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, -0.125, 0.05,
      -0.05, 0.125, 0.05,

      // Back
      0.05, 0.125, -0.05,
      0.05, -0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, 0.125, -0.05
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, -0.25,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      rotationMatrix(0, 0, 0),
      
      // 2
      rotationMatrix(0, 0, 0),
      
      // 3
      multiply(
        [
          1, 0, 0, 0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, 30)),
      
      // 4
      rotationMatrix(0, 0, 0),
      
      // 5
      multiply(
        [
          1, 0, 0, -0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, -30)),

      // 6
      rotationMatrix(0, 0, 0),

      // 7
      multiply(
        [
          1, 0, 0, 0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, 30)),

      // 8
      rotationMatrix(0, 0, 0),

      //9
      rotationMatrix(0, 0, 0),
  ],
  child : null,
  sibling : null
}

var rightlowerarm = {
  name : "rightlowerarm",
  vertexPositions : [
      // Front
      -0.05, 0.125, 0.05,
      -0.05, -0.125, 0.05,
      0.05, -0.125, 0.05,
      0.05, 0.125, 0.05,

      // Top
      -0.05, 0.125, -0.05,
      -0.05, 0.125, 0.05,
      0.05, 0.125, 0.05,
      0.05, 0.125, -0.05,
      
      // Right
      0.05, 0.125, 0.05, 
      0.05, -0.125, 0.05,
      0.05, -0.125, -0.05,
      0.05, 0.125, -0.05,

      // Bottom,
      -0.05, -0.125, 0.05,
      -0.05, -0.125, -0.05,
      0.05, -0.125, -0.05, 
      0.05, -0.125, 0.05,

      // Left
      -0.05, 0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, -0.125, 0.05,
      -0.05, 0.125, 0.05,

      // Back
      0.05, 0.125, -0.05,
      0.05, -0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, 0.125, -0.05
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  animation : [
      // 1
      rotationMatrix(0, 0, 0),
      
      // 2
      rotationMatrix(0, 0, 0),
      
      // 3
      multiply(
        [
          1, 0, 0, 0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, 30)),
      
      // 4
      rotationMatrix(0, 0, 0),
      
      // 5
      multiply(
        [
          1, 0, 0, -0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, -30)),

      // 6
      rotationMatrix(0, 0, 0),

      // 7
      multiply(
        [
          1, 0, 0, 0.05,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
        rotationMatrix(0, 0, 30)),

      // 8
      rotationMatrix(0, 0, 0),

      //9
      rotationMatrix(0, 0, 0),
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, -0.25,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : null
}

var leftlowerleg = {
  name : "leftlowerleg",
  vertexPositions : [
      // Front
      -0.05, 0.125, 0.05,
      -0.05, -0.125, 0.05,
      0.05, -0.125, 0.05,
      0.05, 0.125, 0.05,

      // Top
      -0.05, 0.125, -0.05,
      -0.05, 0.125, 0.05,
      0.05, 0.125, 0.05,
      0.05, 0.125, -0.05,
      
      // Right
      0.05, 0.125, 0.05, 
      0.05, -0.125, 0.05,
      0.05, -0.125, -0.05,
      0.05, 0.125, -0.05,

      // Bottom,
      -0.05, -0.125, 0.05,
      -0.05, -0.125, -0.05,
      0.05, -0.125, -0.05, 
      0.05, -0.125, 0.05,

      // Left
      -0.05, 0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, -0.125, 0.05,
      -0.05, 0.125, 0.05,

      // Back
      0.05, 0.125, -0.05,
      0.05, -0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, 0.125, -0.05
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, -0.25,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : null
}

var rightlowerleg = {
  name : "rightlowerleg",
  vertexPositions : [
      // Front
      -0.05, 0.125, 0.05,
      -0.05, -0.125, 0.05,
      0.05, -0.125, 0.05,
      0.05, 0.125, 0.05,

      // Top
      -0.05, 0.125, -0.05,
      -0.05, 0.125, 0.05,
      0.05, 0.125, 0.05,
      0.05, 0.125, -0.05,
      
      // Right
      0.05, 0.125, 0.05, 
      0.05, -0.125, 0.05,
      0.05, -0.125, -0.05,
      0.05, 0.125, -0.05,

      // Bottom,
      -0.05, -0.125, 0.05,
      -0.05, -0.125, -0.05,
      0.05, -0.125, -0.05, 
      0.05, -0.125, 0.05,

      // Left
      -0.05, 0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, -0.125, 0.05,
      -0.05, 0.125, 0.05,

      // Back
      0.05, 0.125, -0.05,
      0.05, -0.125, -0.05,
      -0.05, -0.125, -0.05,
      -0.05, 0.125, -0.05
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, -0.25,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : null
}

var rightupperleg = {
  name : "rightupperleg",
  vertexPositions : [
      // Front
      -0.06, 0.125, 0.06,
      -0.06, -0.125, 0.06,
      0.06, -0.125, 0.06,
      0.06, 0.125, 0.06,

      // Top
      -0.06, 0.125, -0.06,
      -0.06, 0.125, 0.06,
      0.06, 0.125, 0.06,
      0.06, 0.125, -0.06,
      
      // Right
      0.06, 0.125, 0.06, 
      0.06, -0.125, 0.06,
      0.06, -0.125, -0.06,
      0.06, 0.125, -0.06,

      // Bottom,
      -0.06, -0.125, 0.06,
      -0.06, -0.125, -0.06,
      0.06, -0.125, -0.06, 
      0.06, -0.125, 0.06,

      // Left
      -0.06, 0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, -0.125, 0.06,
      -0.06, 0.125, 0.06,

      // Back
      0.06, 0.125, -0.06,
      0.06, -0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, 0.125, -0.06
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, -0.2,
          0, 1, 0, -0.375,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ],
      
      // 2
      [
          1, 0, 0, 0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 3
      [
          1, 0, 0, 0.06,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 4
      [
          1, 0, 0, 0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0.06,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : rightlowerleg,
  sibling : null
}

var leftupperleg = {
  name : "leftupperleg",
  vertexPositions : [
      // Front
      -0.06, 0.125, 0.06,
      -0.06, -0.125, 0.06,
      0.06, -0.125, 0.06,
      0.06, 0.125, 0.06,

      // Top
      -0.06, 0.125, -0.06,
      -0.06, 0.125, 0.06,
      0.06, 0.125, 0.06,
      0.06, 0.125, -0.06,
      
      // Right
      0.06, 0.125, 0.06, 
      0.06, -0.125, 0.06,
      0.06, -0.125, -0.06,
      0.06, 0.125, -0.06,

      // Bottom,
      -0.06, -0.125, 0.06,
      -0.06, -0.125, -0.06,
      0.06, -0.125, -0.06, 
      0.06, -0.125, 0.06,

      // Left
      -0.06, 0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, -0.125, 0.06,
      -0.06, 0.125, 0.06,

      // Back
      0.06, 0.125, -0.06,
      0.06, -0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, 0.125, -0.06
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, 0.2,
          0, 1, 0, -0.375,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 2
      [
          1, 0, 0, -0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 3
      [
          1, 0, 0, -0.06,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 4
      [
          1, 0, 0, -0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, -0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, -0.06,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, -0.03,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : leftlowerleg,
  sibling : rightupperleg
}

var rightupperarm = {
  name : "rightupperarm",
  vertexPositions : [
      // Front
      -0.06, 0.125, 0.06,
      -0.06, -0.125, 0.06,
      0.06, -0.125, 0.06,
      0.06, 0.125, 0.06,

      // Top
      -0.06, 0.125, -0.06,
      -0.06, 0.125, 0.06,
      0.06, 0.125, 0.06,
      0.06, 0.125, -0.06,
      
      // Right
      0.06, 0.125, 0.06, 
      0.06, -0.125, 0.06,
      0.06, -0.125, -0.06,
      0.06, 0.125, -0.06,

      // Bottom,
      -0.06, -0.125, 0.06,
      -0.06, -0.125, -0.06,
      0.06, -0.125, -0.06, 
      0.06, -0.125, 0.06,

      // Left
      -0.06, 0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, -0.125, 0.06,
      -0.06, 0.125, 0.06,

      // Back
      0.06, 0.125, -0.06,
      0.06, -0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, 0.125, -0.06
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, -0.31,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      rotationMatrix(0, 0, 0),
      
      // 2
      rotationMatrix(30, 0, 0),
      
      // 3
      rotationMatrix(30, 0, 0),
      
      // 4
      rotationMatrix(30, 0, 0),
      
      // 5
      rotationMatrix(30, 0, 0),

      // 6
      rotationMatrix(30, 0, 0),

      // 7
      rotationMatrix(30, 0, 0),

      // 8
      rotationMatrix(30, 0, 0),

      //9
      rotationMatrix(0, 0, 0),
  ],
  child : rightlowerarm,
  sibling : leftupperleg
}

var leftupperarm = {
  name : "leftupperarm",
  vertexPositions : [
      // Front
      -0.06, 0.125, 0.06,
      -0.06, -0.125, 0.06,
      0.06, -0.125, 0.06,
      0.06, 0.125, 0.06,

      // Top
      -0.06, 0.125, -0.06,
      -0.06, 0.125, 0.06,
      0.06, 0.125, 0.06,
      0.06, 0.125, -0.06,
      
      // Right
      0.06, 0.125, 0.06, 
      0.06, -0.125, 0.06,
      0.06, -0.125, -0.06,
      0.06, 0.125, -0.06,

      // Bottom,
      -0.06, -0.125, 0.06,
      -0.06, -0.125, -0.06,
      0.06, -0.125, -0.06, 
      0.06, -0.125, 0.06,

      // Left
      -0.06, 0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, -0.125, 0.06,
      -0.06, 0.125, 0.06,

      // Back
      0.06, 0.125, -0.06,
      0.06, -0.125, -0.06,
      -0.06, -0.125, -0.06,
      -0.06, 0.125, -0.06
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, 0.31,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      rotationMatrix(0, 0, 0),
      
      // 2
      rotationMatrix(-30, 0, 0),
      
      // 3
      rotationMatrix(-30, 0, 0),
      
      // 4
      rotationMatrix(-30, 0, 0),
      
      // 5
      rotationMatrix(-30, 0, 0),

      // 6
      rotationMatrix(-30, 0, 0),

      // 7
      rotationMatrix(-30, 0, 0),

      // 8
      rotationMatrix(-30, 0, 0),

      //9
      rotationMatrix(0, 0, 0),
  ],
  child : leftlowerarm,
  sibling : rightupperarm
}

var head = {
  name : "head",
  vertexPositions : [
      // Front
      -0.125, 0.125, 0.125,
      -0.125, -0.125, 0.125,
      0.125, -0.125, 0.125,
      0.125, 0.125, 0.125,

      // Top
      -0.125, 0.125, -0.125,
      -0.125, 0.125, 0.125,
      0.125, 0.125, 0.125,
      0.125, 0.125, -0.125,
      
      // Right
      0.125, 0.125, 0.125, 
      0.125, -0.125, 0.125,
      0.125, -0.125, -0.125,
      0.125, 0.125, -0.125,

      // Bottom,
      -0.125, -0.125, 0.125,
      -0.125, -0.125, -0.125,
      0.125, -0.125, -0.125, 
      0.125, -0.125, 0.125,

      // Left
      -0.125, 0.125, -0.125,
      -0.125, -0.125, -0.125,
      -0.125, -0.125, 0.125,
      -0.125, 0.125, 0.125,

      // Back
      0.125, 0.125, -0.125,
      0.125, -0.125, -0.125,
      -0.125, -0.125, -0.125,
      -0.125, 0.125, -0.125
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, 0.375,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      scale(1, 1, 1),
        
      // 2
      scale(1, 1.3, 1),
      
      // 3
      scale(1, 1.6, 1),
      
      // 4
      scale(1, 1.3, 1),
      
      // 5
      scale(1, 1, 1),

      // 6
      scale(1.3, 1, 1),

      // 7
      scale(1.6, 1, 1),

      // 8
      scale(1.3, 1, 1),

      //9
      scale(1, 1, 1),
  ],
  child : null,
  sibling : leftupperarm
}

var human = {
  name : "base",
  vertexPositions : [
      // Front
      -0.25, 0.25, 0.125,
      -0.25, -0.25, 0.125,
      0.25, -0.25, 0.125,
      0.25, 0.25, 0.125,

      // Top
      -0.25, 0.25, -0.125,
      -0.25, 0.25, 0.125,
      0.25, 0.25, 0.125,
      0.25, 0.25, -0.125,
      
      // Right
      0.25, 0.25, 0.125, 
      0.25, -0.25, 0.125,
      0.25, -0.25, -0.125,
      0.25, 0.25, -0.125,

      // Bottom,
      -0.25, -0.25, 0.125,
      -0.25, -0.25, -0.125,
      0.25, -0.25, -0.125, 
      0.25, -0.25, 0.125,

      // Left
      -0.25, 0.25, -0.125,
      -0.25, -0.25, -0.125,
      -0.25, -0.25, 0.125,
      -0.25, 0.25, 0.125,

      // Back
      0.25, 0.25, -0.125,
      0.25, -0.25, -0.125,
      -0.25, -0.25, -0.125,
      -0.25, 0.25, -0.125
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Top
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Right
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Bottom
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Left
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,

      // Back
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
      0.5, 0.6, 0.7,
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : head,
  sibling : null
}

//SEAWEED

var topleaf = {
  name: "topleaf",
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
  transform: [
    [
      1, 0, 0, 0,
      0, 1, 0, 0.334,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  ],
  animation: [
    // 1
    [
      Math.cos((-20/3) * (Math.PI / 180)), Math.sin((-20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((-20/3) * (Math.PI / 180)), Math.cos((-20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 2
    [
      Math.cos((-20/3) * (Math.PI / 180)), Math.sin((-20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((-20/3) * (Math.PI / 180)), Math.cos((-20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 3
    [
      Math.cos((-20/3) * (Math.PI / 180)), Math.sin((-20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((-20/3) * (Math.PI / 180)), Math.cos((-20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 4
    [
      Math.cos(7.5 * (Math.PI / 180)), Math.sin(7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(7.5 * (Math.PI / 180)), Math.cos(7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 5
    [
      Math.cos(7.5 * (Math.PI / 180)), Math.sin(7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(7.5 * (Math.PI / 180)), Math.cos(7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 6
    [
      Math.cos(7.5 * (Math.PI / 180)), Math.sin(7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(7.5 * (Math.PI / 180)), Math.cos(7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 7
    [
      Math.cos(7.5 * (Math.PI / 180)), Math.sin(7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(7.5 * (Math.PI / 180)), Math.cos(7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 8
    [
      Math.cos(-5 * (Math.PI / 180)), Math.sin(-5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-5 * (Math.PI / 180)), Math.cos(-5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    //9
    [
      Math.cos(-5 * (Math.PI / 180)), Math.sin(-5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-5 * (Math.PI / 180)), Math.cos(-5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
  ],
  child: null,
  sibling: null
}

var middleleaf = {
  name: "middleleaf",
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
  transform: [
    [
      1, 0, 0, 0,
      0, 1, 0, 0.33,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  ],
  animation: [
    // 1
    [
      Math.cos((20/3) * (Math.PI / 180)), Math.sin((20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((20/3) * (Math.PI / 180)), Math.cos((20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 2
    [
      Math.cos((20/3) * (Math.PI / 180)), Math.sin((20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((20/3) * (Math.PI / 180)), Math.cos((20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 3
    [
      Math.cos((20/3) * (Math.PI / 180)), Math.sin((20/3) * (Math.PI / 180)), 0, 0,
      -Math.sin((20/3) * (Math.PI / 180)), Math.cos((20/3) * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 4
    [
      Math.cos(-7.5 * (Math.PI / 180)), Math.sin(-7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-7.5 * (Math.PI / 180)), Math.cos(-7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 5
    [
      Math.cos(-7.5 * (Math.PI / 180)), Math.sin(-7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-7.5 * (Math.PI / 180)), Math.cos(-7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 6
    [
      Math.cos(-7.5 * (Math.PI / 180)), Math.sin(-7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-7.5 * (Math.PI / 180)), Math.cos(-7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 7
    [
      Math.cos(-7.5 * (Math.PI / 180)), Math.sin(-7.5 * (Math.PI / 180)), 0, 0,
      -Math.sin(-7.5 * (Math.PI / 180)), Math.cos(-7.5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 8
    [
      Math.cos(5 * (Math.PI / 180)), Math.sin(5 * (Math.PI / 180)), 0, 0,
      -Math.sin(5 * (Math.PI / 180)), Math.cos(5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    //9
    [
      Math.cos(5 * (Math.PI / 180)), Math.sin(5 * (Math.PI / 180)), 0, 0,
      -Math.sin(5 * (Math.PI / 180)), Math.cos(5 * (Math.PI / 180)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
  ],
  child: topleaf,
  sibling: null
}

var bottomleaf = {
  name: "bottomleaf",
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
  transform: [
    [
      1, 0, 0, 0,
      0, 1, 0, -0.602,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  ],
  animation: [
    // 1
    [
      1, 0, 0, 0,
      0, Math.cos(5* (Math.PI / 180)), Math.sin(5* (Math.PI / 180)), 0,
      0, -Math.sin(5* (Math.PI / 180)), Math.cos(5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 2
    [
      1, 0, 0, 0,
      0, Math.cos(5* (Math.PI / 180)), Math.sin(5* (Math.PI / 180)), 0,
      0, -Math.sin(5* (Math.PI / 180)), Math.cos(5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 3
    [
      1, 0, 0, 0,
      0, Math.cos(5* (Math.PI / 180)), Math.sin(5* (Math.PI / 180)), 0,
      0, -Math.sin(5* (Math.PI / 180)), Math.cos(5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 4
    [
      1, 0, 0, 0,
      0, Math.cos(-7.5* (Math.PI / 180)), Math.sin(-7.5* (Math.PI / 180)), 0,
      0, -Math.sin(-7.5* (Math.PI / 180)), Math.cos(-7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 5
    [
      1, 0, 0, 0,
      0, Math.cos(-7.5* (Math.PI / 180)), Math.sin(-7.5* (Math.PI / 180)), 0,
      0, -Math.sin(-7.5* (Math.PI / 180)), Math.cos(-7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 6
    [
      1, 0, 0, 0,
      0, Math.cos(-7.5* (Math.PI / 180)), Math.sin(-7.5* (Math.PI / 180)), 0,
      0, -Math.sin(-7.5* (Math.PI / 180)), Math.cos(-7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 7
    [
      1, 0, 0, 0,
      0, Math.cos(-7.5* (Math.PI / 180)), Math.sin(-7.5* (Math.PI / 180)), 0,
      0, -Math.sin(-7.5* (Math.PI / 180)), Math.cos(-7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    // 8
    [
      1, 0, 0, 0,
      0, Math.cos(7.5* (Math.PI / 180)), Math.sin(7.5* (Math.PI / 180)), 0,
      0, -Math.sin(7.5* (Math.PI / 180)), Math.cos(7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],

    //9
    [
      1, 0, 0, 0,
      0, Math.cos(7.5* (Math.PI / 180)), Math.sin(7.5* (Math.PI / 180)), 0,
      0, -Math.sin(7.5* (Math.PI / 180)), Math.cos(7.5* (Math.PI / 180)), 0,
      0, 0, 0, 1,
    ],
  ],
  child: middleleaf,
  sibling: null
}

var seaweed = {
  name: "base",
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
  transform: [
    [
      Math.cos(Math.PI / 3), 0, Math.sin(Math.PI / 3), 0,
      0, 1, 0, 0,
      -Math.sin(Math.PI / 3), 0, Math.cos(Math.PI / 3), 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  ],
  animation: [
    // 1
    [
      1.15, 0, 0, 0,
      0, 1.15, 0, 0,
      0, 0, 1.15, 0,
      0, 0, 0, 1,
    ],

    // 2
    [
      1.15, 0, 0, 0,
      0, 1.15, 0, 0,
      0, 0, 1.15, 0,
      0, 0, 0, 1,
    ],

    // 3
    [
      1.15, 0, 0, 0,
      0, 1.15, 0, 0,
      0, 0, 1.15, 0,
      0, 0, 0, 1,
    ],

    // 4
    [
      1.15, 0, 0, 0,
      0, 1.15, 0, 0,
      0, 0, 1.15, 0,
      0, 0, 0, 1,
    ],

    // 5
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],

    // 6
    [
      0.8695653, 0, 0, 0,
      0, 0.8695653, 0, 0,
      0, 0, 0.8695653, 0,
      0, 0, 0, 1,
    ],

    // 7
    [
      0.8695653, 0, 0, 0,
      0, 0.8695653, 0, 0,
      0, 0, 0.8695653, 0,
      0, 0, 0, 1,
    ],

    // 8
    [
      0.8695653, 0, 0, 0,
      0, 0.8695653, 0, 0,
      0, 0, 0.8695653, 0,
      0, 0, 0, 1,
    ],

    //9
    [
      0.8695653, 0, 0, 0,
      0, 0.8695653, 0, 0,
      0, 0, 0.8695653, 0,
      0, 0, 0, 1,
    ]
  ],
  child: bottomleaf,
  sibling: null
}

//COW
var leftfrontleg = {
  name : "leftfrontleg",
  vertexPositions : [
      // Front
      -0.1, -0.1, 0.2,
      -0.1, -0.7, 0.2,
      0, -0.7, 0.2,
      0, -0.1, 0.2,

      // Top
      -0.1, -0.1, 0.2,
      -0.1, -0.1, 0.1,
      0, -0.1, 0.1,
      0, -0.1, 0.2,
      
      // Right
      0, -0.1, 0.2, 
      0, -0.7, 0.2,
      0, -0.7, 0.1,
      0, -0.1, 0.1,

      // Bottom,
      -0.1, -0.7, 0.2,
      -0.1, -0.7, 0.1,
      0, -0.7, 0.1, 
      0, -0.7, 0.2,

      // Left
      -0.1, -0.1, 0.1,
      -0.1, -0.7, 0.1,
      -0.1, -0.7, 0.2,
      -0.1, -0.1, 0.2,

      // Back
      0, -0.1, 0.1,
      0, -0.7, 0.1,
      -0.1, -0.7, 0.1,
      -0.1, -0.1, 0.1,
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Top
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Right
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Bottom
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Left
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Back
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
  ],
  transform : [
      [
          1, 0, 0, -0.2,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
    // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

    // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],    
  child : null,
  sibling : null
}

var leftbackleg = {
  name : "leftbackleg",
  vertexPositions : [
      // Front
      -0.1, -0.1, 0.2,
      -0.1, -0.7, 0.2,
      0, -0.7, 0.2,
      0, -0.1, 0.2,
      
      // Top
      -0.1, -0.1, 0.2,
      -0.1, -0.1, 0.1,
      0, -0.1, 0.1,
      0, -0.1, 0.2,
      
      // Right
      0, -0.1, 0.2, 
      0, -0.7, 0.2,
      0, -0.7, 0.1,
      0, -0.1, 0.1,
      
      // Bottom,
      -0.1, -0.7, 0.2,
      -0.1, -0.7, 0.1,
      0, -0.7, 0.1, 
      0, -0.7, 0.2,
      
      // Left
      -0.1, -0.1, 0.1,
      -0.1, -0.7, 0.1,
      -0.1, -0.7, 0.2,
      -0.1, -0.1, 0.2,
      
      // Back
      0, -0.1, 0.1,
      0, -0.7, 0.1,
      -0.1, -0.7, 0.1,
      -0.1, -0.1, 0.1,
  ],  
  vertexNormals : [
          // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      
      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Top
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Right
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Bottom
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Left
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Back
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
  ],
  transform : [
      [
          1, 0, 0, 0.3,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
    // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

    // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : leftfrontleg
}

var rightfrontleg = {
  name : "rightfrontleg",
  vertexPositions : [
      // Front
      -0.1, -0.1, -0.2,
      -0.1, -0.7, -0.2,
      0, -0.7, -0.2,
      0, -0.1, -0.2,
      
       // Top
      -0.1, -0.1, -0.2,
      -0.1, -0.1, -0.1,
      0, -0.1, -0.1,
      0, -0.1, -0.2,
      
       // Right
      0, -0.1, -0.2, 
      0, -0.7, -0.2,
      0, -0.7, -0.1,
      0, -0.1, -0.1,
      
       // Bottom,
      -0.1, -0.7, -0.2,
      -0.1, -0.7, -0.1,
      0, -0.7, -0.1, 
      0, -0.7, -0.2,
      
       // Left
      -0.1, -0.1, -0.1,
      -0.1, -0.7, -0.1,
      -0.1, -0.7, -0.2,
      -0.1, -0.1, -0.2,
      
       // Back
      0, -0.1, -0.1,
      0, -0.7, -0.1,
      -0.1, -0.7, -0.1,
      -0.1, -0.1, -0.1,
      ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,

      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Top
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Right
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Bottom
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Left
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Back
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
  ],
  transform : [
      [
          1, 0, 0, -0.2,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
    // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      
      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : leftbackleg
}

var rightbackleg = {
  name : "rightbackleg",
  vertexPositions : [
      // Front
      -0.1, -0.1, -0.2,
      -0.1, -0.7, -0.2,
      0, -0.7, -0.2,
      0, -0.1, -0.2,
      
      // Top
      -0.1, -0.1, -0.2,
      -0.1, -0.1, -0.1,
      0, -0.1, -0.1,
      0, -0.1, -0.2,
      
      // Right
      0, -0.1, -0.2, 
      0, -0.7, -0.2,
      0, -0.7, -0.1,
      0, -0.1, -0.1,
      
      // Bottom,
      -0.1, -0.7, -0.2,
      -0.1, -0.7, -0.1,
      0, -0.7, -0.1, 
      0, -0.7, -0.2,
      
      // Left
      -0.1, -0.1, -0.1,
      -0.1, -0.7, -0.1,
      -0.1, -0.7, -0.2,
      -0.1, -0.1, -0.2,
      
      // Back
      0, -0.1, -0.1,
      0, -0.7, -0.1,
      -0.1, -0.7, -0.1,
      -0.1, -0.1, -0.1,
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,

      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Top
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Right
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Bottom
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Left
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,

      // Back
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
      0.5, 0.3, 0.19,
  ],
  transform : [
      [
          1, 0, 0, 0.31,
          0, 1, 0, 0.125,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : rightfrontleg
}

var headc = {
  name : "headc",
  vertexPositions : [
      // Front
      -0.15, 0.15, 0.15,
      -0.15, -0.15, 0.15,
      0.15, -0.15, 0.15,
      0.15, 0.15, 0.15,

      // Top
      -0.15, 0.15, -0.15,
      -0.15, 0.15, 0.15,
      0.15, 0.15, 0.15,
      0.15, 0.15, -0.15,
      
      // Right
      0.15, 0.15, 0.15, 
      0.15, -0.15, 0.15,
      0.15, -0.15, -0.15,
      0.15, 0.15, -0.15,

      // Bottom,
      -0.15, -0.15, 0.15,
      -0.15, -0.15, -0.15,
      0.15, -0.15, -0.15, 
      0.15, -0.15, 0.15,

      // Left
      -0.15, 0.15, -0.15,
      -0.15, -0.15, -0.15,
      -0.15, -0.15, 0.15,
      -0.15, 0.15, 0.15,

      // Back
      0.15, 0.15, -0.15,
      0.15, -0.15, -0.15,
      -0.15, -0.15, -0.15,
      -0.15, 0.15, -0.15
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,

      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Top
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Right
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Bottom
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Left
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Back
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
  ],
  transform : [
      [
          1, 0, 0, -0.5,
          0, 1, 0, 0.4,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 2
      [   
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : null,
  sibling : rightbackleg
}   

var cow = {
  name : "base",
  vertexPositions : [
      // Front
      -0.4, 0.4, 0.3,
      -0.4, -0.1, 0.3,
      0.4, -0.1, 0.3,
      0.4, 0.4, 0.3,

      // Top
      -0.4, 0.4, -0.3,
      -0.4, 0.4, 0.3,
      0.4, 0.4, 0.3,
      0.4, 0.4, -0.3,

      // Right
      0.4, 0.4, 0.3, 
      0.4, -0.1, 0.3,
      0.4, -0.1, -0.3,
      0.4, 0.4, -0.3,

      // Bottom,
      0.4, -0.1, 0.3,
      0.4, -0.1, -0.3,
      -0.4, -0.1, -0.3,
      -0.4, -0.1, 0.3,

      // Left
      -0.4, 0.4, -0.3, 
      -0.4, -0.1, -0.3,
      -0.4, -0.1, 0.3,
      -0.4, 0.4, 0.3,

      // Back
      0.4, 0.4, -0.3,
      0.4, -0.1, -0.3,
      -0.4, -0.1, -0.3,
      -0.4, 0.4, -0.3,
  ],
  vertexNormals : [
      // Front
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Top
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Right
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      // Bottom
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      // Left
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,

      // Back
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
  ],
  vertexColors : [
      // Front
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Top
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Right
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Bottom
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Left
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,

      // Back
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
      0.6, 0.61, 0.59,
  ],
  transform : [
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  animation : [
      // 1
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 2
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 3
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 4
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 5
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 6
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 7
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      // 8
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ],

      //9
      [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
      ]
  ],
  child : headc,
  sibling : null
} 
var articulatedModel = {
  name: "human",
  vertexPositions: [],
  vertexNormals: [],
  vertexColors: []
};
var transformStack = [];
traverse(human, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
hollowModel = articulatedModel;

function resetArticulatedModel(name) {
  articulatedModel = {
    name: name,
    vertexPositions: [],
    vertexNormals: [],
    vertexColors: []
  };
  transformStack = [];
  console.log(name);
}

function resetTraverseRedraw(model) {
  resetArticulatedModel(model.name);
  traverse(model, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  hollowModel = articulatedModel;
  redraw();
}

function traverse(currentModel, currentModelMatrix) {
  // console.log("TRAVERSE ENTER");
  // console.log(currentModel.name);
  transformStack.push(currentModelMatrix);
  // console.log(currentModel.transform);
  var transform = multiply(currentModel.transform[0], multiply(currentModel.transform[1], currentModel.transform[2]))
  // console.log(transform);
  currentModelMatrix = multiply(currentModelMatrix, transform);
  for (let i = 0; i < currentModel.vertexPositions.length / 3; i++) {
    var px = currentModel.vertexPositions[3 * i + 0];
    var py = currentModel.vertexPositions[3 * i + 1];
    var pz = currentModel.vertexPositions[3 * i + 2];
    articulatedModel.vertexPositions.push(currentModelMatrix[0] * px + currentModelMatrix[1] * py + currentModelMatrix[2] * pz + currentModelMatrix[3]);
    articulatedModel.vertexPositions.push(currentModelMatrix[4] * px + currentModelMatrix[5] * py + currentModelMatrix[6] * pz + currentModelMatrix[7]);
    articulatedModel.vertexPositions.push(currentModelMatrix[8] * px + currentModelMatrix[9] * py + currentModelMatrix[10] * pz + currentModelMatrix[11]);

    var nx = currentModel.vertexNormals[3 * i + 0];
    var ny = currentModel.vertexNormals[3 * i + 1];
    var nz = currentModel.vertexNormals[3 * i + 2];
    articulatedModel.vertexNormals.push(currentModelMatrix[0] * nx + currentModelMatrix[1] * ny + currentModelMatrix[2] * nz);
    articulatedModel.vertexNormals.push(currentModelMatrix[4] * nx + currentModelMatrix[5] * ny + currentModelMatrix[6] * nz);
    articulatedModel.vertexNormals.push(currentModelMatrix[8] * nx + currentModelMatrix[9] * ny + currentModelMatrix[10] * nz);

    var cx = currentModel.vertexColors[3 * i + 0];
    var cy = currentModel.vertexColors[3 * i + 1];
    var cz = currentModel.vertexColors[3 * i + 2];
    articulatedModel.vertexColors.push(cx);
    articulatedModel.vertexColors.push(cy);
    articulatedModel.vertexColors.push(cz);
  }
  // console.log("RENDERED");
  if (currentModel.child != null) {
    // console.log(currentModel.child.name);
    traverse(currentModel.child, currentModelMatrix);
  }
  // console.log("CHILDED");
  currentModelMatrix = transformStack.pop()
  if (currentModel.sibling != null) {
    // console.log(currentModel.sibling.name);
    traverse(currentModel.sibling, currentModelMatrix);
  }
  // console.log("TRAVERSE EXIT");
}

function traverseAnimate(currentModel, currentModelMatrix, frame) {
  // console.log("TRAVERSEA ENTER");
  // console.log(currentModel.name);
  transformStack.push(currentModelMatrix);
  //console.log(currentModel.transform);
  var transform = multiply(currentModel.transform[0], multiply(currentModel.transform[1], currentModel.transform[2]))
  // console.log(transform);
  // console.log(currentModel.animation[frame]);
  currentModelMatrix = multiply(currentModelMatrix, multiply(transform, currentModel.animation[frame]));
  // console.log(currentModelMatrix);
  for (let i = 0; i < currentModel.vertexPositions.length / 3; i++) {
    var px = currentModel.vertexPositions[3 * i + 0];
    var py = currentModel.vertexPositions[3 * i + 1];
    var pz = currentModel.vertexPositions[3 * i + 2];
    articulatedModel.vertexPositions.push(currentModelMatrix[0]*px + currentModelMatrix[1]*py + currentModelMatrix[2] * pz + currentModelMatrix[3]);
    articulatedModel.vertexPositions.push(currentModelMatrix[4]*px + currentModelMatrix[5]*py + currentModelMatrix[6] * pz + currentModelMatrix[7]);
    articulatedModel.vertexPositions.push(currentModelMatrix[8]*px + currentModelMatrix[9]*py + currentModelMatrix[10] * pz + currentModelMatrix[11]);

    var nx = currentModel.vertexNormals[3 * i + 0];
    var ny = currentModel.vertexNormals[3 * i + 1];
    var nz = currentModel.vertexNormals[3 * i + 2];
    articulatedModel.vertexNormals.push(currentModelMatrix[0]*nx + currentModelMatrix[1]*ny + currentModelMatrix[2] * nz);
    articulatedModel.vertexNormals.push(currentModelMatrix[4]*nx + currentModelMatrix[5]*ny + currentModelMatrix[6] * nz);
    articulatedModel.vertexNormals.push(currentModelMatrix[8]*nx + currentModelMatrix[9]*ny + currentModelMatrix[10] * nz);

    var cx = currentModel.vertexColors[3 * i + 0];
    var cy = currentModel.vertexColors[3 * i + 1];
    var cz = currentModel.vertexColors[3 * i + 2];
    articulatedModel.vertexColors.push(cx);
    articulatedModel.vertexColors.push(cy);
    articulatedModel.vertexColors.push(cz);
  }
  // console.log("RENDERED");
  if (currentModel.child != null) {
    // console.log(currentModel.child.name);
    traverseAnimate(currentModel.child, currentModelMatrix, frame);
  }
  // console.log("CHILDED");
  currentModelMatrix = transformStack.pop()
  if (currentModel.sibling != null) {
    // console.log(currentModel.sibling.name);
    traverseAnimate(currentModel.sibling, currentModelMatrix, frame);
  }
  // console.log("TRAVERSEA EXIT");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateModel() {
  console.log("ANIMATE");
  var modelName = document.getElementById("model").value;
  if (modelName == "human") {
    for (let i = 0; i < 9; i++) {
      console.log("ANIMATE HUMAN");
      resetArticulatedModel("human");
      traverseAnimate(human, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], i);
      hollowModel = articulatedModel; 
      redraw();
      await sleep(200);
    }
  }
}

const canvas = document.getElementById("canvas");
const gl = check(canvas);
var oldAngle = 0;
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
  setGeometry(gl, hollowModel.vertexPositions);

  // Create and store data into color buffer
  var color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  setColors(gl, hollowModel.vertexColors);

  var normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hollowModel.vertexNormals), gl.STATIC_DRAW);

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
    redraw();
  } else {
    boolshade = 0
    redraw();
  }
})


function humanComponent() {
  var componentName = document.getElementById("humancomponent").value;
  if (componentName == "all") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = transx;
    document.getElementById("translation-y").value = transy;
    document.getElementById("translation-z").value = transz;
    document.getElementById("rotation-x").value = anglex;
    document.getElementById("rotation-y").value = angley;
    document.getElementById("rotation-z").value = anglez;
  } else if (componentName == "head") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = headtransx;
    document.getElementById("translation-y").value = headtransy;
    document.getElementById("translation-z").value = headtransz;
    document.getElementById("rotation-x").value = headanglex;
    document.getElementById("rotation-y").value = headangley;
    document.getElementById("rotation-z").value = headanglez;
  } else if (componentName == "leftupperarm") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = leftupperarmtransx;
    document.getElementById("translation-y").value = leftupperarmtransy;
    document.getElementById("translation-z").value = leftupperarmtransz;
    document.getElementById("rotation-x").value = leftupperarmanglex;
    document.getElementById("rotation-y").value = leftupperarmangley;
    document.getElementById("rotation-z").value = leftupperarmanglez;
  } else if (componentName == "rightupperarm") {
    document.getElementById("scale").value = rightupperarmdilate;
    document.getElementById("translation-x").value = rightupperarmtransx;
    document.getElementById("translation-y").value = rightupperarmtransy;
    document.getElementById("translation-z").value = rightupperarmtransz;
    document.getElementById("rotation-x").value = rightupperarmanglex;
    document.getElementById("rotation-y").value = rightupperarmangley;
    document.getElementById("rotation-z").value = rightupperarmanglez;
  } else if (componentName == "leftupperleg") {
    document.getElementById("scale").value = leftupperlegdilate;
    document.getElementById("translation-x").value = leftupperlegtransx;
    document.getElementById("translation-y").value = leftupperlegtransy;
    document.getElementById("translation-z").value = leftupperlegtransz;
    document.getElementById("rotation-x").value = leftupperleganglex;
    document.getElementById("rotation-y").value = leftupperlegangley;
    document.getElementById("rotation-z").value = leftupperleganglez;
  } else if (componentName == "rightupperleg") {
    document.getElementById("scale").value = rightupperlegdilate;
    document.getElementById("translation-x").value = rightupperlegtransx;
    document.getElementById("translation-y").value = rightupperlegtransy;
    document.getElementById("translation-z").value = rightupperlegtransz;
    document.getElementById("rotation-x").value = rightupperleganglex;
    document.getElementById("rotation-y").value = rightupperlegangley;
    document.getElementById("rotation-z").value = rightupperleganglez;
  } else if (componentName == "leftlowerarm") {
    document.getElementById("scale").value = leftlowerarmdilate;
    document.getElementById("translation-x").value = leftlowerarmtransx;
    document.getElementById("translation-y").value = leftlowerarmtransy;
    document.getElementById("translation-z").value = leftlowerarmtransz;
    document.getElementById("rotation-x").value = leftlowerarmanglex;
    document.getElementById("rotation-y").value = leftlowerarmangley;
    document.getElementById("rotation-z").value = leftlowerarmanglez;
  } else if (componentName == "rightlowerarm") {
    document.getElementById("scale").value = rightlowerarmdilate;
    document.getElementById("translation-x").value = rightlowerarmtransx;
    document.getElementById("translation-y").value = rightlowerarmtransy;
    document.getElementById("translation-z").value = rightlowerarmtransz;
    document.getElementById("rotation-x").value = rightlowerarmanglex;
    document.getElementById("rotation-y").value = rightlowerarmangley;
    document.getElementById("rotation-z").value = rightlowerarmanglez;
  } else if (componentName == "leftlowerleg") {
    document.getElementById("scale").value = leftlowerlegdilate;
    document.getElementById("translation-x").value = leftlowerlegtransx;
    document.getElementById("translation-y").value = leftlowerlegtransy;
    document.getElementById("translation-z").value = leftlowerlegtransz;
    document.getElementById("rotation-x").value = leftlowerleganglex;
    document.getElementById("rotation-y").value = leftlowerlegangley;
    document.getElementById("rotation-z").value = leftlowerleganglez;
  } else {
    document.getElementById("scale").value = rightlowerlegdilate;
    document.getElementById("translation-x").value = rightlowerlegtransx;
    document.getElementById("translation-y").value = rightlowerlegtransy;
    document.getElementById("translation-z").value = rightlowerlegtransz;
    document.getElementById("rotation-x").value = rightlowerleganglex;
    document.getElementById("rotation-y").value = rightlowerlegangley;
    document.getElementById("rotation-z").value = rightlowerleganglez;
  }
}
function giraffeComponent() {
  var componentName = document.getElementById("giraffecomponent").value;
  if (componentName == "all") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = transx;
    document.getElementById("translation-y").value = transy;
    document.getElementById("translation-z").value = transz;
    document.getElementById("rotation-x").value = anglex;
    document.getElementById("rotation-y").value = angley;
    document.getElementById("rotation-z").value = anglez;
  } else if (componentName == "head") {
    console.log("pp");
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = headtransx;
    document.getElementById("translation-y").value = headtransy;
    document.getElementById("translation-z").value = headtransz;
    document.getElementById("rotation-x").value = headanglex;
    document.getElementById("rotation-y").value = headangley;
    document.getElementById("rotation-z").value = headanglez;
  } else if (componentName == "leftupperarm") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = leftupperarmtransx;
    document.getElementById("translation-y").value = leftupperarmtransy;
    document.getElementById("translation-z").value = leftupperarmtransz;
    document.getElementById("rotation-x").value = leftupperarmanglex;
    document.getElementById("rotation-y").value = leftupperarmangley;
    document.getElementById("rotation-z").value = leftupperarmanglez;
  } else if (componentName == "rightupperarm") {
    document.getElementById("scale").value = rightupperarmdilate;
    document.getElementById("translation-x").value = rightupperarmtransx;
    document.getElementById("translation-y").value = rightupperarmtransy;
    document.getElementById("translation-z").value = rightupperarmtransz;
    document.getElementById("rotation-x").value = rightupperarmanglex;
    document.getElementById("rotation-y").value = rightupperarmangley;
    document.getElementById("rotation-z").value = rightupperarmanglez;
  } else if (componentName == "leftupperleg") {
    document.getElementById("scale").value = leftupperlegdilate;
    document.getElementById("translation-x").value = leftupperlegtransx;
    document.getElementById("translation-y").value = leftupperlegtransy;
    document.getElementById("translation-z").value = leftupperlegtransz;
    document.getElementById("rotation-x").value = leftupperleganglex;
    document.getElementById("rotation-y").value = leftupperlegangley;
    document.getElementById("rotation-z").value = leftupperleganglez;
  } else if (componentName == "rightupperleg") {
    document.getElementById("scale").value = rightupperlegdilate;
    document.getElementById("translation-x").value = rightupperlegtransx;
    document.getElementById("translation-y").value = rightupperlegtransy;
    document.getElementById("translation-z").value = rightupperlegtransz;
    document.getElementById("rotation-x").value = rightupperleganglex;
    document.getElementById("rotation-y").value = rightupperlegangley;
    document.getElementById("rotation-z").value = rightupperleganglez;
  } else if (componentName == "leftlowerarm") {
    document.getElementById("scale").value = leftlowerarmdilate;
    document.getElementById("translation-x").value = leftlowerarmtransx;
    document.getElementById("translation-y").value = leftlowerarmtransy;
    document.getElementById("translation-z").value = leftlowerarmtransz;
    document.getElementById("rotation-x").value = leftlowerarmanglex;
    document.getElementById("rotation-y").value = leftlowerarmangley;
    document.getElementById("rotation-z").value = leftlowerarmanglez;
  } else if (componentName == "rightlowerarm") {
    document.getElementById("scale").value = rightlowerarmdilate;
    document.getElementById("translation-x").value = rightlowerarmtransx;
    document.getElementById("translation-y").value = rightlowerarmtransy;
    document.getElementById("translation-z").value = rightlowerarmtransz;
    document.getElementById("rotation-x").value = rightlowerarmanglex;
    document.getElementById("rotation-y").value = rightlowerarmangley;
    document.getElementById("rotation-z").value = rightlowerarmanglez;
  } else if (componentName == "leftlowerleg") {
    document.getElementById("scale").value = leftlowerlegdilate;
    document.getElementById("translation-x").value = leftlowerlegtransx;
    document.getElementById("translation-y").value = leftlowerlegtransy;
    document.getElementById("translation-z").value = leftlowerlegtransz;
    document.getElementById("rotation-x").value = leftlowerleganglex;
    document.getElementById("rotation-y").value = leftlowerlegangley;
    document.getElementById("rotation-z").value = leftlowerleganglez;
  } else {
    document.getElementById("scale").value = rightlowerlegdilate;
    document.getElementById("translation-x").value = rightlowerlegtransx;
    document.getElementById("translation-y").value = rightlowerlegtransy;
    document.getElementById("translation-z").value = rightlowerlegtransz;
    document.getElementById("rotation-x").value = rightlowerleganglex;
    document.getElementById("rotation-y").value = rightlowerlegangley;
    document.getElementById("rotation-z").value = rightlowerleganglez;
  }
}

function seaweedComponent() {
  var componentName = document.getElementById("seaweedcomponent").value;
  if (componentName == "all") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = transx;
    document.getElementById("translation-y").value = transy;
    document.getElementById("translation-z").value = transz;
    document.getElementById("rotation-x").value = anglex;
    document.getElementById("rotation-y").value = angley;
    document.getElementById("rotation-z").value = anglez;
  } else if (componentName == "bottomleaf") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = bottomleaftransx;
    document.getElementById("translation-y").value = bottomleaftransy;
    document.getElementById("translation-z").value = bottomleaftransz;
    document.getElementById("rotation-x").value = bottomleafanglex;
    document.getElementById("rotation-y").value = bottomleafangley;
    document.getElementById("rotation-z").value = bottomleafanglez;
  } else if (componentName == "middleleaf") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = middleleaftransx;
    document.getElementById("translation-y").value = middleleaftransy;
    document.getElementById("translation-z").value = middleleaftransz;
    document.getElementById("rotation-x").value = middleleafanglex;
    document.getElementById("rotation-y").value = middleleafangley;
    document.getElementById("rotation-z").value = middleleafanglez;
  } else if (componentName == "topleaf") {
    document.getElementById("scale").value = topleafdilate;
    document.getElementById("translation-x").value = topleaftransx;
    document.getElementById("translation-y").value = topleaftransy;
    document.getElementById("translation-z").value = topleaftransz;
    document.getElementById("rotation-x").value = topleafanglex;
    document.getElementById("rotation-y").value = topleafangley;
    document.getElementById("rotation-z").value = topleafanglez;
  }
}

function cowComponent(){
  var componentName = document.getElementById("cowcomponent").value;
  if (componentName == "all") {
    document.getElementById("scale").value = dilate;
    document.getElementById("translation-x").value = transx;
    document.getElementById("translation-y").value = transy;
    document.getElementById("translation-z").value = transz;
    document.getElementById("rotation-x").value = anglex;
    document.getElementById("rotation-y").value = angley;
    document.getElementById("rotation-z").value = anglez;
  } else if (componentName == "LeftFront") {
    document.getElementById("scale").value = LeftFrontDilate;
    document.getElementById("translation-x").value = LeftFrontTransX;
    document.getElementById("translation-y").value = LeftFrontTransY;
    document.getElementById("translation-z").value = LeftFrontTransZ;
    document.getElementById("rotation-x").value = LeftFrontAngleX;
    document.getElementById("rotation-y").value = LeftFrontAngleY;
    document.getElementById("rotation-z").value = LeftFrontAngleZ;
  }else if (componentName == "LeftBack") {
    document.getElementById("scale").value = LeftBackDilate;
    document.getElementById("translation-x").value = LeftBackTransX;
    document.getElementById("translation-y").value = LeftBackTransY;
    document.getElementById("translation-z").value = LeftBackTransZ;
    document.getElementById("rotation-x").value = LeftBackAngleX;
    document.getElementById("rotation-y").value = LeftBackAngleY;
    document.getElementById("rotation-z").value = LeftBackAngleZ;
  }else if (componentName == "RightFront") {
    document.getElementById("scale").value = RightFrontDilate;
    document.getElementById("translation-x").value = RightFrontTransX;
    document.getElementById("translation-y").value = RightFrontTransY;
    document.getElementById("translation-z").value = RightFrontTransZ;
    document.getElementById("rotation-x").value = RightFrontAngleX;
    document.getElementById("rotation-y").value = RightFrontAngleY;
    document.getElementById("rotation-z").value = RightFrontAngleZ;
  }else if (componentName == "RightBack") {
    document.getElementById("scale").value = RightBackDilate;
    document.getElementById("translation-x").value = RightBackTransX;
    document.getElementById("translation-y").value = RightBackTransY;
    document.getElementById("translation-z").value = RightBackTransZ;
    document.getElementById("rotation-x").value = RightBackAngleX;
    document.getElementById("rotation-y").value = RightBackAngleY;
    document.getElementById("rotation-z").value = RightBackAngleZ;
  }else if (componentName == "HeadC") {
    document.getElementById("scale").value = HeadCDilate;
    document.getElementById("translation-x").value = HeadCTransX;
    document.getElementById("translation-y").value = HeadCTransY;
    document.getElementById("translation-z").value = HeadCTransZ;
    document.getElementById("rotation-x").value = HeadCAngleX;
    document.getElementById("rotation-y").value = HeadCAngleY;
    document.getElementById("rotation-z").value = HeadCAngleZ;
  }
}

var distance = document.getElementById("distance").value;
var camera_height = 0.05
var view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -camera_height, distance, 1];
// draw object
function draw(proj_matrix, model_matrix, start, end) {
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
}

function redraw() {
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
  }
}

function setUpInitScene() {
  updateAngleY();

  var proj_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  var model_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  for (var i = 0; i < 12 * 4 * 4; i++) {
    vertices.push(hollowModel.vertexPositions[i]);
  }

  const numVertices = hollowModel.vertexPositions.length / 3;

  objects.push({
    "name": hollowModel.name,
    "offset": 0,
    "end": numVertices,
    "numVertices": numVertices,
    "vertices": vertices,
    "color": hollowModel.vertexColors,
    "normals": hollowModel.vertexNormals,
    "projMatrix": proj_matrix,
    "modelMatrix": model_matrix
  });

  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
  }
  oldAngle = 0;
  document.getElementById('angle').value = oldAngle;
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  setup();
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
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

function modelHandler() {
  var modelName = document.getElementById("model").value;
  if (modelName == "human") {
    resetArticulatedModel("human");
    traverse(human, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    hollowModel = articulatedModel;
  } else if (modelName == "giraffe") {
    resetArticulatedModel("giraffe");
    traverse(giraffe, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    hollowModel = articulatedModel;
  } else if (modelName == "seaweed") {
    resetArticulatedModel("seaweed");
    traverse(seaweed, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    hollowModel = articulatedModel;
  } else {
    resetArticulatedModel("cow");
    traverse(cow, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    hollowModel = articulatedModel;
  }
  setup();
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
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
  setup();
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
  }

}

function distanceHandler() {
  projectionType = document.getElementById("projection").value;
  if (projectionType == "perspective") {
    distance = document.getElementById("distance").value;
    view_matrix[14] = distance;
    setup();
    redraw();
  }
}

function resetHandler() {
  updateTranslate("object", 'x', -document.getElementById("translation-x").value);
  updateTranslate("object", 'y', -document.getElementById("translation-y").value);
  updateTranslate("object", 'z', -document.getElementById("translation-z").value);
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
    setup();
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
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
  let centerPoint = getCenterPoint(0, hollowModel.vertexPositions.length, hollowModel.vertexPositions);
  var translate_matrix1 = translation(-centerPoint[0], -centerPoint[1], 0);
  var translate_matrix2 = translation(centerPoint[0], centerPoint[1], 0);
  var rotation_matrix = rotationMatrix(x, y, z);
  var trans = multiply(translate_matrix1, multiply(rotation_matrix, translate_matrix2));

  objects[idx].modelMatrix = multiply(trans, objects[idx].modelMatrix)

  redraw();
}
function updateScale(obj, value) {
  var idx = 0;
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name == obj) {
      idx = i;
      break;
    }
  }
  let centerPoint = getCenterPoint(0, hollowModel.vertexPositions.length, hollowModel.vertexPositions);
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
  const currentModelMatrix = objects[idx].modelMatrix;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      let sum3 = 0;
      for (var k = 0; k < 4; k++)
        sum3 = sum3 + model_matrix[i * 4 + k] * currentModelMatrix[k * 4 + j];
      objects[idx].modelMatrix[i * 4 + j] = sum3;
    }
  }
  for (var i = 0; i < objects.length; i++) {
    draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
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
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltatransx = xValue - transx;
      transx = xValue;
      updateTranslate("object", 'x', deltatransx);
    } else if (componentName == "head") {
      const deltatransx = xValue - headtransx;
      headtransx = xValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransx = xValue - leftupperarmtransx;
      leftupperarmtransx = xValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransx = xValue - rightupperarmtransx;
      rightupperarmtransx = xValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransx = xValue - leftupperlegtransx;
      leftupperlegtransx = xValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransx = xValue - rightupperlegtransx;
      rightupperlegtransx = xValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransx = xValue - leftlowerarmtransx;
      leftlowerarmtransx = xValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransx = xValue - rightlowerarmtransx;
      rightlowerarmtransx = xValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransx = xValue - leftlowerlegtransx;
      leftlowerlegtransx = xValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransx = xValue - rightlowerlegtransx;
      rightlowerlegtransx = xValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }
  else if(modelName=="giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltatransx = xValue - transx;
      transx = xValue;
      updateTranslate("object", 'x', deltatransx);
    } else if (componentName == "head") {
      const deltatransx = xValue - headtransx;
      headtransx = xValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransx = xValue - leftupperarmtransx;
      leftupperarmtransx = xValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransx = xValue - rightupperarmtransx;
      rightupperarmtransx = xValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransx = xValue - leftupperlegtransx;
      leftupperlegtransx = xValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransx = xValue - rightupperlegtransx;
      rightupperlegtransx = xValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransx = xValue - leftlowerarmtransx;
      leftlowerarmtransx = xValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransx = xValue - rightlowerarmtransx;
      rightlowerarmtransx = xValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransx = xValue - leftlowerlegtransx;
      leftlowerlegtransx = xValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransx = xValue - rightlowerlegtransx;
      rightlowerlegtransx = xValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  } 
  else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltatransx = xValue - transx;
      transx = xValue;
      updateTranslate("object", 'x', deltatransx);
    } else if (componentName == "bottomleaf") {
      const deltatransx = xValue - bottomleaftransx;
      bottomleaftransx = xValue;

      bottomleaf.transform[0] = multiply(bottomleaf.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltatransx = xValue - middleleaftransx;
      middleleaftransx = xValue;

      middleleaf.transform[0] = multiply(middleleaf.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltatransx = xValue - topleaftransx;
      topleaftransx = xValue;

      topleaf.transform[0] = multiply(topleaf.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow"){
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if(componentName == "all"){
      const deltatransx = xValue - transx;
      transx = xValue;
      updateTranslate("object", 'x', deltatransx);
    }else if(componentName == "LeftFront"){
      const deltatransx = xValue - LeftFrontTransX;
      LeftFrontTransX = xValue;
      leftfrontleg.transform[0] = multiply(leftfrontleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "LeftBack"){
      const deltatransx = xValue - LeftBackTransX;
      LeftBackTransX = xValue;
      leftbackleg.transform[0] = multiply(leftbackleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightBack"){
      const deltatransx = xValue - RightBackTransX;
      RightBackTransX = xValue;
      rightbackleg.transform[0] = multiply(rightbackleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightFront"){
      const deltatransx = xValue - RightFrontTransX;
      RightFrontTransX = xValue;
      rightfrontleg.transform[0] = multiply(rightfrontleg.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "HeadC"){
      const deltatransx = xValue - HeadCTransX;
      HeadCTransX = xValue;
      headc.transform[0] = multiply(headc.transform[0], [1, 0, 0, deltatransx, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }
  }
});
yTranslation.addEventListener('input', () => {
  const yValue = yTranslation.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltatransy = yValue - transy;
      transy = yValue;
      updateTranslate("object", 'y', deltatransy);
    } else if (componentName == "head") {
      const deltatransy = yValue - headtransy;
      headtransy = yValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransy = yValue - leftupperarmtransy;
      leftupperarmtransy = yValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransy = yValue - rightupperarmtransy;
      rightupperarmtransy = yValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransy = yValue - leftupperlegtransy;
      leftupperlegtransy = yValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransy = yValue - rightupperlegtransy;
      rightupperlegtransy = yValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransy = yValue - leftlowerarmtransy;
      leftlowerarmtransy = yValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransy = yValue - rightlowerarmtransy;
      rightlowerarmtransy = yValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransy = yValue - leftlowerlegtransy;
      leftlowerlegtransy = yValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransy = yValue - rightlowerlegtransy;
      rightlowerlegtransy = yValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }else if(modelName="giraffe") {
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltatransy = yValue - transy;
      transy = yValue;
      updateTranslate("object", 'y', deltatransy);
    } else if (componentName == "head") {
      const deltatransy = yValue - headtransy;
      headtransy = yValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransy = yValue - leftupperarmtransy;
      leftupperarmtransy = yValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransy = yValue - rightupperarmtransy;
      rightupperarmtransy = yValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransy = yValue - leftupperlegtransy;
      leftupperlegtransy = yValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransy = yValue - rightupperlegtransy;
      rightupperlegtransy = yValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransy = yValue - leftlowerarmtransy;
      leftlowerarmtransy = yValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransy = yValue - rightlowerarmtransy;
      rightlowerarmtransy = yValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransy = yValue - leftlowerlegtransy;
      leftlowerlegtransy = yValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransy = yValue - rightlowerlegtransy;
      rightlowerlegtransy = yValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }
  else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltatransy = yValue - transy;
      transy = yValue;
      updateTranslate("object", 'y', deltatransy);
    } else if (componentName == "bottomleaf") {
      const deltatransy = yValue - bottomleaftransy;
      bottomleaftransy = yValue;

      bottomleaf.transform[0] = multiply(bottomleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltatransy = yValue - middleleaftransy;
      middleleaftransy = yValue;

      middleleaf.transform[0] = multiply(middleleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltatransy = yValue - topleaftransy;
      topleaftransy = yValue;

      topleaf.transform[0] = multiply(topleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow"){
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if(componentName == "all"){
      const deltatransy = yValue - transy;
      transy = yValue;
      updateTranslate("object", 'y', deltatransy);
    }else if(componentName == "LeftFront"){
      const deltatransy = yValue - LeftFrontTransY;
      LeftFrontTransY = yValue;
      leftfrontleg.transform[0] = multiply(leftfrontleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "LeftBack"){
      const deltatransy = yValue - LeftBackTransY;
      LeftBackTransY = yValue;
      leftbackleg.transform[0] = multiply(leftbackleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightBack"){
      const deltatransy = yValue - RightBackTransY;
      RightBackTransY = yValue;
      rightbackleg.transform[0] = multiply(rightbackleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightFront"){
      const deltatransy = yValue - RightFrontTransY;
      RightFrontTransY = yValue;
      rightfrontleg.transform[0] = multiply(rightfrontleg.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "HeadC"){
      const deltatransy = yValue - HeadCTransY;
      HeadCTransY = yValue;
      headc.transform[0] = multiply(headc.transform[0], [1, 0, 0, 0, 0, 1, 0, deltatransy, 0, 0, 1, 0, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }
  }
});

zTranslation.addEventListener('input', () => {
  const zValue = zTranslation.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltatransz = zValue - transz;
      transz = zValue;
      updateTranslate("object", 'z', deltatransz);
    } else if (componentName == "head") {
      const deltatransz = zValue - headtransz;
      headtransz = zValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransz = zValue - leftupperarmtransz;
      leftupperarmtransz = zValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransz = zValue - rightupperarmtransz;
      rightupperarmtransz = zValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransz = zValue - leftupperlegtransz;
      leftupperlegtransz = zValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransz = zValue - rightupperlegtransz;
      rightupperlegtransz = zValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransz = zValue - leftlowerarmtransz;
      leftlowerarmtransz = zValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransz = zValue - rightlowerarmtransz;
      rightlowerarmtransz = zValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransz = zValue - leftlowerlegtransz;
      leftlowerlegtransz = zValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransz = zValue - rightlowerlegtransz;
      rightlowerlegtransz = zValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }
  else if(modelName=="giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltatransz = zValue - transz;
      transz = zValue;
      updateTranslate("object", 'z', deltatransz);
    } else if (componentName == "head") {
      const deltatransz = zValue - headtransz;
      headtransz = zValue;

      head.transform[0] = multiply(head.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltatransz = zValue - leftupperarmtransz;
      leftupperarmtransz = zValue;

      leftupperarm.transform[0] = multiply(leftupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltatransz = zValue - rightupperarmtransz;
      rightupperarmtransz = zValue;

      rightupperarm.transform[0] = multiply(rightupperarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltatransz = zValue - leftupperlegtransz;
      leftupperlegtransz = zValue;

      leftupperleg.transform[0] = multiply(leftupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltatransz = zValue - rightupperlegtransz;
      rightupperlegtransz = zValue;

      rightupperleg.transform[0] = multiply(rightupperleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltatransz = zValue - leftlowerarmtransz;
      leftlowerarmtransz = zValue;

      leftlowerarm.transform[0] = multiply(leftlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltatransz = zValue - rightlowerarmtransz;
      rightlowerarmtransz = zValue;

      rightlowerarm.transform[0] = multiply(rightlowerarm.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltatransz = zValue - leftlowerlegtransz;
      leftlowerlegtransz = zValue;

      leftlowerleg.transform[0] = multiply(leftlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltatransz = zValue - rightlowerlegtransz;
      rightlowerlegtransz = zValue;

      rightlowerleg.transform[0] = multiply(rightlowerleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  } 
  else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltatransz = zValue - transz;
      transz = zValue;
      updateTranslate("object", 'z', deltatransz);
    } else if (componentName == "bottomleaf") {
      const deltatransz = zValue - bottomleaftransz;
      bottomleaftransz = zValue;

      bottomleaf.transform[0] = multiply(bottomleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltatransz = zValue - middleleaftransz;
      middleleaftransz = zValue;

      middleleaf.transform[0] = multiply(middleleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltatransz = zValue - topleaftransz;
      topleaftransz = zValue;

      topleaf.transform[0] = multiply(topleaf.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow") {
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if(componentName == "all"){
      const deltatransz = zValue - transz;
      transz = zValue;
      updateTranslate("object", 'y', deltatransz);
    }else if(componentName == "LeftFront"){
      const deltatransz = zValue - LeftFrontTransZ;
      LeftFrontTransZ = zValue;
      leftfrontleg.transform[0] = multiply(leftfrontleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "LeftBack"){
      const deltatransz = zValue - LeftBackTransZ;
      LeftBackTransZ = zValue;
      leftbackleg.transform[0] = multiply(leftbackleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightBack"){
      const deltatransz = zValue - RightBackTransZ;
      RightBackTransZ = zValue;
      rightbackleg.transform[0] = multiply(rightbackleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "RightFront"){
      const deltatransz = zValue - RightFrontTransZ;
      RightFrontTransZ = zValue;
      rightfrontleg.transform[0] = multiply(rightfrontleg.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }else if(componentName == "HeadC"){
      const deltatransz = zValue - HeadCTransZ;
      HeadCTransZ = zValue;
      headc.transform[0] = multiply(headc.transform[0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, deltatransz, 0, 0, 0, 1])
      resetTraverseRedraw(model);
    }
  }
});

scaleInput.addEventListener('input', () => {
  const scaleValue = scaleInput.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltascale = scaleValue / dilate;
      dilate = scaleValue;
      updateScale("object", deltascale);
    } else if (componentName == "head") {
      const deltascale = scaleValue / headdilate;
      headdilate = scaleValue;

      head.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], head.transform[2]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltascale = scaleValue / leftupperarmdilate;
      leftupperarmdilate = scaleValue;

      leftupperarm.transform[2] = multiply(leftupperarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltascale = scaleValue / rightupperarmdilate;
      rightupperarmdilate = scaleValue;

      rightupperarm.transform[2] = multiply(rightupperarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltascale = scaleValue / leftupperlegdilate;
      leftupperlegdilate = scaleValue;

      leftupperleg.transform[2] = multiply(leftupperleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltascale = scaleValue / rightupperlegdilate;
      rightupperlegdilate = scaleValue;

      rightupperleg.transform[2] = multiply(rightupperleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltascale = scaleValue / leftlowerarmdilate;
      leftlowerarmdilate = scaleValue;

      leftlowerarm.transform[2] = multiply(leftlowerarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltascale = scaleValue / rightlowerarmdilate;
      rightlowerarmdilate = scaleValue;

      rightlowerarm.transform[2] = multiply(rightlowerarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltascale = scaleValue / leftlowerlegdilate;
      leftlowerlegdilate = scaleValue;

      leftlowerleg.transform[2] = multiply(leftlowerleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltascale = scaleValue / rightlowerlegdilate;
      rightlowerlegdilate = scaleValue;

      rightlowerleg.transform[2] = multiply(rightlowerleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }
  else if(modelName="giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltascale = scaleValue / dilate;
      dilate = scaleValue;
      updateScale("object", deltascale);
    } else if (componentName == "head") {
      const deltascale = scaleValue / headdilate;
      headdilate = scaleValue;

      head.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], head.transform[2]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltascale = scaleValue / leftupperarmdilate;
      leftupperarmdilate = scaleValue;

      leftupperarm.transform[2] = multiply(leftupperarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltascale = scaleValue / rightupperarmdilate;
      rightupperarmdilate = scaleValue;

      rightupperarm.transform[2] = multiply(rightupperarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltascale = scaleValue / leftupperlegdilate;
      leftupperlegdilate = scaleValue;

      leftupperleg.transform[2] = multiply(leftupperleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltascale = scaleValue / rightupperlegdilate;
      rightupperlegdilate = scaleValue;

      rightupperleg.transform[2] = multiply(rightupperleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltascale = scaleValue / leftlowerarmdilate;
      leftlowerarmdilate = scaleValue;

      leftlowerarm.transform[2] = multiply(leftlowerarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltascale = scaleValue / rightlowerarmdilate;
      rightlowerarmdilate = scaleValue;

      rightlowerarm.transform[2] = multiply(rightlowerarm.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltascale = scaleValue / leftlowerlegdilate;
      leftlowerlegdilate = scaleValue;

      leftlowerleg.transform[2] = multiply(leftlowerleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    } else {
      const deltascale = scaleValue / rightlowerlegdilate;
      rightlowerlegdilate = scaleValue;

      rightlowerleg.transform[2] = multiply(rightlowerleg.transform[2], [deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1]);

      resetTraverseRedraw(model);
    }
  }
   else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltascale = scaleValue / dilate;
      dilate = scaleValue;
      updateScale("object", deltascale);
    } else if (componentName == "bottomleaf") {
      const deltascale = scaleValue / bottomleafdilate;
      bottomleafdilate = scaleValue;

      bottomleaf.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], bottomleaf.transform[2]);

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltascale = scaleValue / middleleafdilate;
      middleleafdilate = scaleValue;

      middleleaf.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], middleleaf.transform[2]);

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltascale = scaleValue / topleafdilate;
      topleafdilate = scaleValue;

      topleaf.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], topleaf.transform[2]);

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow") {
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if(componentName == "all"){
      const deltascale = scaleValue / dilate;
      dilate = scaleValue;
      updateScale("object", deltascale);
    }else if(componentName == "LeftFront"){
      const deltascale = scaleValue / LeftFrontDilate;
      LeftFrontDilate = deltascale;

      leftfrontleg.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], leftfrontleg.transform[2])

      resetTraverseRedraw(model);
    }else if(componentName == "LeftBack"){
      const deltascale = scaleValue / LeftBackDilate;
      LeftBackDilate = deltascale;

      leftbackleg.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], leftbackleg.transform[2])

      resetTraverseRedraw(model);
    }else if(componentName == "RightFront"){
      const deltascale = scaleValue / RightFrontDilate;
      RightFrontDilate = deltascale;

      rightfrontleg.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], rightfrontleg.transform[2])

      resetTraverseRedraw(model);
    }else if(componentName == "RightBack"){
      const deltascale = scaleValue / RightBackDilate;
      RightBackDilate = deltascale;

      rightbackleg.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], rightbackleg.transform[2])

      resetTraverseRedraw(model);
    }else if(componentName == "HeadC"){
      const deltascale = scaleValue / HeadCDilate;
      HeadCDilate = deltascale;

      headc.transform[2] = multiply([deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, deltascale, 0, 0, 0, 0, 1], headc.transform[2])

      resetTraverseRedraw(model);
    }
  }
});
rotXInput.addEventListener('input', () => {
  const rotxValue = rotXInput.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltarotx = rotxValue - anglex;
      anglex = rotxValue;
      updateRotation("object", deltarotx, 0, 0)
    } else if (componentName == "head") {
      const deltarotx = rotxValue - headanglex;
      headanglex = rotxValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltarotx = rotxValue - leftupperarmanglex;
      leftupperarmanglex = rotxValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltarotx = rotxValue - rightupperarmanglex;
      rightupperarmanglex = rotxValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltarotx = rotxValue - leftupperleganglex;
      leftupperleganglex = rotxValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltarotx = rotxValue - rightupperleganglex;
      rightupperleganglex = rotxValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltarotx = rotxValue - leftlowerarmanglex;
      leftlowerarmanglex = rotxValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltarotx = rotxValue - rightlowerarmanglex;
      rightlowerarmanglex = rotxValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltarotx = rotxValue - leftlowerleganglex;
      leftlowerleganglex = rotxValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else {
      const deltarotx = rotxValue - rightlowerleganglex;
      rightlowerleganglex = rotxValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }
  }else if(modelName== "giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltarotx = rotxValue - anglex;
      anglex = rotxValue;
      updateRotation("object", deltarotx, 0, 0)
    } else if (componentName == "head") {
      const deltarotx = rotxValue - headanglex;
      headanglex = rotxValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltarotx = rotxValue - leftupperarmanglex;
      leftupperarmanglex = rotxValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltarotx = rotxValue - rightupperarmanglex;
      rightupperarmanglex = rotxValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltarotx = rotxValue - leftupperleganglex;
      leftupperleganglex = rotxValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltarotx = rotxValue - rightupperleganglex;
      rightupperleganglex = rotxValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltarotx = rotxValue - leftlowerarmanglex;
      leftlowerarmanglex = rotxValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltarotx = rotxValue - rightlowerarmanglex;
      rightlowerarmanglex = rotxValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltarotx = rotxValue - leftlowerleganglex;
      leftlowerleganglex = rotxValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else {
      const deltarotx = rotxValue - rightlowerleganglex;
      rightlowerleganglex = rotxValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }
  }
   else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltarotx = rotxValue - anglex;
      anglex = rotxValue;
      updateRotation("object", deltarotx, 0, 0)
    } else if (componentName == "bottomleaf") {
      const deltarotx = rotxValue - bottomleafanglex;
      bottomleafanglex = rotxValue;

      bottomleaf.transform[1] = multiply(bottomleaf.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltarotx = rotxValue - middleleafanglex;
      middleleafanglex = rotxValue;

      middleleaf.transform[1] = multiply(middleleaf.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltarotx = rotxValue - topleafanglex;
      topleafanglex = rotxValue;

      topleaf.transform[1] = multiply(topleaf.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow") {
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if (componentName == "all") {
      const deltarotx = rotxValue - anglex;
      anglex = rotxValue;
      updateRotation("object", deltarotx, 0, 0)
    } else if (componentName == "HeadC"){
      const deltarotx = rotxValue - HeadCAngleX;
      HeadCAngleX = rotxValue;

      headc.transform[1] = multiply(headc.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "LeftFront"){
      const deltarotx = rotxValue - LeftFrontAngleX;
      LeftFrontAngleX = rotxValue;

      leftfrontleg.transform[1] = multiply(leftfrontleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "LeftBack"){
      const deltarotx = rotxValue - LeftBackAngleX;
      LeftBackAngleX = rotxValue;

      leftbackleg.transform[1] = multiply(leftbackleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "RightFront"){
      const deltarotx = rotxValue - RightFrontAngleX;
      RightFrontAngleX = rotxValue;

      rightfrontleg.transform[1] = multiply(rightfrontleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "RightBack"){
      const deltarotx = rotxValue - RightBackAngleX;
      RightBackAngleX = rotxValue;

      rightbackleg.transform[1] = multiply(rightbackleg.transform[1], rotationMatrix(deltarotx, 0, 0));

      resetTraverseRedraw(model);
    }
  }
})

rotYInput.addEventListener('input', () => {
  const rotyValue = rotYInput.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltaroty = rotyValue - angley;
      angley = rotyValue;
      updateRotation("object", 0, deltaroty, 0)
    } else if (componentName == "head") {
      const deltaroty = rotyValue - headangley;
      headangley = rotyValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltaroty = rotyValue - leftupperarmangley;
      leftupperarmangley = rotyValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltaroty = rotyValue - rightupperarmangley;
      rightupperarmangley = rotyValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltaroty = rotyValue - leftupperlegangley;
      leftupperlegangley = rotyValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltaroty = rotyValue - rightupperlegangley;
      rightupperlegangley = rotyValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltaroty = rotyValue - leftlowerarmangley;
      leftlowerarmangley = rotyValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltaroty = rotyValue - rightlowerarmangley;
      rightlowerarmangley = rotyValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltaroty = rotyValue - leftlowerlegangley;
      leftlowerlegangley = rotyValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else {
      const deltaroty = rotyValue - rightlowerlegangley;
      rightlowerlegangley = rotyValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }
  }else if(modelName=="giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltaroty = rotyValue - angley;
      angley = rotyValue;
      updateRotation("object", 0, deltaroty, 0)
    } else if (componentName == "head") {
      const deltaroty = rotyValue - headangley;
      headangley = rotyValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltaroty = rotyValue - leftupperarmangley;
      leftupperarmangley = rotyValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltaroty = rotyValue - rightupperarmangley;
      rightupperarmangley = rotyValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltaroty = rotyValue - leftupperlegangley;
      leftupperlegangley = rotyValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltaroty = rotyValue - rightupperlegangley;
      rightupperlegangley = rotyValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltaroty = rotyValue - leftlowerarmangley;
      leftlowerarmangley = rotyValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltaroty = rotyValue - rightlowerarmangley;
      rightlowerarmangley = rotyValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltaroty = rotyValue - leftlowerlegangley;
      leftlowerlegangley = rotyValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else {
      const deltaroty = rotyValue - rightlowerlegangley;
      rightlowerlegangley = rotyValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }
  } 
  else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltaroty = rotyValue - angley;
      angley = rotyValue;
      updateRotation("object", 0, deltaroty, 0)
    } else if (componentName == "bottomleaf") {
      const deltaroty = rotyValue - bottomleafangley;
      bottomleafangley = rotyValue;

      bottomleaf.transform[1] = multiply(bottomleaf.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltaroty = rotyValue - middleleafangley;
      middleleafangley = rotyValue;

      middleleaf.transform[1] = multiply(middleleaf.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltaroty = rotyValue - topleafangley;
      topleafangley = rotyValue;

      topleaf.transform[1] = multiply(topleaf.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow") {
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if (componentName == "all") {
      const deltaroty = rotyValue - angley;
      angley = rotyValue;
      updateRotation("object", 0, deltaroty, 0)
    } else if (componentName == "HeadC") {
      const deltaroty = rotyValue - HeadCAngleY;
      HeadCAngleY = rotyValue;

      headc.transform[1] = multiply(headc.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "LeftFront") {
      const deltaroty = rotyValue - LeftFrontAngleY;
      LeftFrontAngleY = rotyValue;

      leftfrontleg.transform[1] = multiply(leftfrontleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "LeftBack") {
      const deltaroty = rotyValue - LeftBackAngleY;
      LeftBackAngleY = rotyValue;

      leftbackleg.transform[1] = multiply(leftbackleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "RightFront") {
      const deltaroty = rotyValue - RightFrontAngleY;
      RightFrontAngleY = rotyValue;

      rightfrontleg.transform[1] = multiply(rightfrontleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }else if (componentName == "RightBack") {
      const deltaroty = rotyValue - RightBackAngleY;
      RightBackAngleY = rotyValue;

      rightbackleg.transform[1] = multiply(rightbackleg.transform[1], rotationMatrix(0, deltaroty, 0));

      resetTraverseRedraw(model);
    }
  }
})
rotZInput.addEventListener('input', () => {
  const rotzValue = rotZInput.value;
  var modelName = document.getElementById("model").value;
  var model;
  if (modelName == "human") {
    model = human;
    var componentName = document.getElementById("humancomponent").value;
    if (componentName == "all") {
      const deltarotz = rotzValue - anglez;
      anglez = rotzValue;
      updateRotation("object", 0, 0, deltarotz);
    } else if (componentName == "head") {
      const deltarotz = rotzValue - headanglez;
      headanglez = rotzValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltarotz = rotzValue - leftupperarmanglez;
      leftupperarmanglez = rotzValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltarotz = rotzValue - rightupperarmanglez;
      rightupperarmanglez = rotzValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltarotz = rotzValue - leftupperleganglez;
      leftupperleganglez = rotzValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltarotz = rotzValue - rightupperleganglez;
      rightupperleganglez = rotzValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltarotz = rotzValue - leftlowerarmanglez;
      leftlowerarmanglez = rotzValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltarotz = rotzValue - rightlowerarmanglez;
      rightlowerarmanglez = rotzValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltarotz = rotzValue - leftlowerleganglez;
      leftlowerleganglez = rotzValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else {
      const deltarotz = rotzValue - rightlowerleganglez;
      rightlowerleganglez = rotzValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }
  }
  else if(modelName =="giraffe"){
    model = giraffe;
    var componentName = document.getElementById("giraffecomponent").value;
    if (componentName == "all") {
      const deltarotz = rotzValue - anglez;
      anglez = rotzValue;
      updateRotation("object", 0, 0, deltarotz);
    } else if (componentName == "head") {
      const deltarotz = rotzValue - headanglez;
      headanglez = rotzValue;

      head.transform[1] = multiply(head.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperarm") {
      const deltarotz = rotzValue - leftupperarmanglez;
      leftupperarmanglez = rotzValue;

      leftupperarm.transform[1] = multiply(leftupperarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperarm") {
      const deltarotz = rotzValue - rightupperarmanglez;
      rightupperarmanglez = rotzValue;

      rightupperarm.transform[1] = multiply(rightupperarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftupperleg") {
      const deltarotz = rotzValue - leftupperleganglez;
      leftupperleganglez = rotzValue;

      leftupperleg.transform[1] = multiply(leftupperleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightupperleg") {
      const deltarotz = rotzValue - rightupperleganglez;
      rightupperleganglez = rotzValue;

      rightupperleg.transform[1] = multiply(rightupperleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerarm") {
      const deltarotz = rotzValue - leftlowerarmanglez;
      leftlowerarmanglez = rotzValue;

      leftlowerarm.transform[1] = multiply(leftlowerarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "rightlowerarm") {
      const deltarotz = rotzValue - rightlowerarmanglez;
      rightlowerarmanglez = rotzValue;

      rightlowerarm.transform[1] = multiply(rightlowerarm.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "leftlowerleg") {
      const deltarotz = rotzValue - leftlowerleganglez;
      leftlowerleganglez = rotzValue;

      leftlowerleg.transform[1] = multiply(leftlowerleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else {
      const deltarotz = rotzValue - rightlowerleganglez;
      rightlowerleganglez = rotzValue;

      rightlowerleg.transform[1] = multiply(rightlowerleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }

  }
   else if (modelName == "seaweed") {
    model = seaweed;
    var componentName = document.getElementById("seaweedcomponent").value;
    if (componentName == "all") {
      const deltarotz = rotzValue - anglez;
      anglez = rotzValue;
      updateRotation("object", 0, 0, deltarotz)
    } else if (componentName == "bottomleaf") {
      const deltarotz = rotzValue - bottomleafanglez;
      bottomleafanglez = rotzValue;

      bottomleaf.transform[1] = multiply(bottomleaf.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "middleleaf") {
      const deltarotz = rotzValue - middleleafanglez;
      middleleafanglez = rotzValue;

      middleleaf.transform[1] = multiply(middleleaf.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    } else if (componentName == "topleaf") {
      const deltarotz = rotzValue - topleafanglez;
      topleafanglez = rotzValue;

      topleaf.transform[1] = multiply(topleaf.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }
  } else if (modelName == "cow") {
    model = cow;
    var componentName = document.getElementById("cowcomponent").value;
    if (componentName == "all") {
      const deltarotz = rotzValue - anglez;
      anglez = rotzValue;
      updateRotation("object", 0, 0, deltarotz)
    } else if(componentName == "HeadC"){
      const deltarotz = rotzValue - HeadCAngleZ;
      HeadCAngleZ = rotzValue;

      headc.transform[1] = multiply(headc.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }else if(componentName == "LeftFront"){
      const deltarotz = rotzValue - LeftFrontAngleZ;
      LeftFrontAngleZ = rotzValue;

      leftfrontleg.transform[1] = multiply(leftfrontleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }else if(componentName == "LeftBack"){
      const deltarotz = rotzValue - LeftBackAngleZ;
      LeftBackAngleZ = rotzValue;

      leftbackleg.transform[1] = multiply(leftbackleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }else if(componentName == "RightFront"){
      const deltarotz = rotzValue - RightFrontAngleZ;
      RightFrontAngleZ = rotzValue;

      rightfrontleg.transform[1] = multiply(rightfrontleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }else if(componentName == "RightBack"){
      const deltarotz = rotzValue - RightBackAngleZ;
      RightBackAngleZ = rotzValue;

      rightbackleg.transform[1] = multiply(rightbackleg.transform[1], rotationMatrix(0, 0, deltarotz));

      resetTraverseRedraw(model);
    }
  }
})

function save() {
  const object = JSON.stringify(articulatedModel, null, 4);
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
      draw(objects[i].projMatrix, objects[i].modelMatrix, objects[i].offset, objects[i].end);
    }
  } else {
    hollowModel = parsedJson;
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