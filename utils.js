function getObjIdx(name){
    for(var i = 0; i<objectsArray.length; i++){
        if(objectsArray[i].name == name){
            return i;
        }
    }
}

function matrixMultiply(a, b) {
    const c = new Array(16).fill(0);
  
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          c[4*i + j] += a[4*i + k] * b[4*k + j];
        }
      }
    }
  
    return c;
  }

function getCenterPoint(start, end, arr) {
    const coordinates = arr.slice(start, end);
  
    const maxX = Math.max(...coordinates.filter((_, idx) => idx % 3 === 0));
    const minX = Math.min(...coordinates.filter((_, idx) => idx % 3 === 0));
    const maxY = Math.max(...coordinates.filter((_, idx) => idx % 3 === 1));
    const minY = Math.min(...coordinates.filter((_, idx) => idx % 3 === 1));
  
    const centerX = (maxX + minX) / 2;
    const centerY = (maxY + minY) / 2;
    
    return [centerX, centerY];
}


function matrixInvert(matrix) {
  const n = matrix.length;
  const identity = new Array(n).fill(0).map((_, i) => new Array(n).fill(0).map((_, j) => i === j ? 1 : 0));
  for (let k = 0; k < n; k++) {
    const temp = matrix[k][k];
    for (let j = 0; j < n; j++) {
      matrix[k][j] /= temp;
      identity[k][j] /= temp;
    }
    for (let i = 0; i < n; i++) {
      if (i === k) continue;
      const temp2 = matrix[i][k];
      for (let j = 0; j < n; j++) {
        matrix[i][j] -= matrix[k][j] * temp2;
        identity[i][j] -= identity[k][j] * temp2;
      }
    }
  }
  for (let k = n - 1; k > 0; k--) {
    for (let i = k - 1; i >= 0; i--) {
      const temp = matrix[i][k];
      for (let j = 0; j < n; j++) {
        matrix[i][j] -= matrix[k][j] * temp;
        identity[i][j] -= identity[k][j] * temp;
      }
    }
  }
  return identity;
}

function matrixTranspose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function saveData() {
  const json = JSON.stringify(objectsArray, null, 4);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
  const exportFileDefaultName = '3d-objects.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function loadData() {
  const linkElement = document.createElement('input');
  linkElement.setAttribute('type', 'file');
  linkElement.setAttribute('name', 'file-load');
  linkElement.setAttribute('value', 'file-load');
  linkElement.setAttribute('id', 'file-load');
  linkElement.setAttribute('onchange', 'importData()');

  const dynamicParent = document.getElementById('dynamic-parent');
  dynamicParent.appendChild(linkElement);
  
  linkElement.click();
}

async function importData() {
  const fileUpload = document.getElementById('file-load');

  if (fileUpload.files.length > 0) {
    const file = fileUpload.files[0];
    const path = URL.createObjectURL(file);
    await initModelFile(path);
  }
}

async function initModelFile(filename) {
  const objectsArray = JSON.parse(await loadFile(filename));

  document.getElementById('resetButton').click();
  setUpBufferFromObjects();

  for (let i = 0; i < 3; i++) {
    draw(objectsArray[i].projMatrix, objectsArray[i].modelMatrix, objectsArray[i].offset, objectsArray[i].end);
  }
}

async function loadFile(filename) {
  return await fetchFile(filename);
}

async function fetchFile(filename) {
  const response = await fetch(filename);
  return await response.text();
}