import findMaxElement from "../../../utils/matrixFunctions/findMaxElement";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import getCol from "../../../utils/matrixFunctions/getCol";
import { usolve, add, multiply, divide, det } from "mathjs";

const gaussTotalFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  
  let m = matrixA.length;
  let n = matrixA[0].length;
  if (m !== n) {
    throw Error("The matrix is not square");
  }
  if (m !== B.length) {
    throw Error("B has different dimension");
  }
  if (det(matrixA) === 0) {
    throw Error("Determinant of the matrix cannot be zero");
  }
  let M = new Array(n);
  for (let i = 0; i < n; i++) {
    M[i] = new Array(n + 1);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      M[i][j] = matrixA[i][j];
    }
    M[i][n] = B[i][0];
  }

  let marca = new Array(n);
  for (let i = 0; i < n; i++) {
    marca[i] = i + 1;
  }

  results.iterations.push(deepCopyFunction(M));

  //inicia solucion 

  for (let i = 0; i < n - 1; i++) {

    let indexMax = new Array(2);

    
    indexMax = findMaxElement(M, i, i);
    let colMayor = indexMax[1];

    
    // cambio de columna

    if(i !== colMayor){
    for (let j = 0; j < n; j++) {
      let temp = M[j][indexMax[1]];
      M[j][indexMax[1]] = M[j][i];
      M[j][i] = temp;
    }

    
    let temp = marca[colMayor];
    marca[colMayor] = marca[i];
    marca[i] = temp;
  }

    //Cambio de fila
    if( i !== indexMax[0]){

    for (let j = i; j < n + 1; j++) {
      let temp = M[indexMax[0]][j];
      M[indexMax[0]][j] = M[i][j];
      M[i][j] = temp;
    }
  }
    for (let j = i + 1; j < n; j++) {
      if (M[j][i] !== 0) {
        let auxOp = Array(n + 1);
        for (let k = i; k < n + 1; k++) {
          auxOp[k] = add(M[j][k], - multiply(divide(M[j][i], M[i][i]), M[i][k]));
        }
        for (let k = i; k < n + 1; k++) {
          M[j][k] = auxOp[k];
        }
      }
    }
  
    
    results.iterations.push(deepCopyFunction(M));
  }

  results.conclusion = "After applying regressive substitution we get :";
  let resultX = usolve(
    M.map(function(val) {
      // A = all columns of M except the last one
      return val.slice(0, -1);
    }),
    getCol(M, m), // B = last column of M
  );
  
  let tempAr = deepCopyFunction(resultX);
  for (let i = 0; i < n; i++) {
    resultX[marca[i]-1] = tempAr[i];
  }
  results.finalSolution = resultX;

  return results;
};

export default gaussTotalFunction;
