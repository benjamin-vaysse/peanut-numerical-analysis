import {
  det,
  diag,
  add,
  unaryMinus,
  inv,
  multiply,
  subtract,
  abs,
  max,
  norm
} from "mathjs";
import { eig } from "numericjs"; //didn't exist for non-symmetrical matrices in mathjs
import zeroInDiagonal from "../../../utils/matrixFunctions/zeroInDiagonal";
import tril from "../../../utils/matrixFunctions/tril";
import triu from "../../../utils/matrixFunctions/triu";
import normP from "../../../utils/normP";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const iterativeMethodsFunctions = (
  matrixA,
  B,
  initialValueX0,
  tol,
  NMax,
  normValue,
  l = 1,
  w = 1
) => {
  let results = {
    D: [[]],
    L: [[]],
    U: [[]],
    C: [[]],
    T: [[]],
    spectralRadiance: undefined,
    iterations: [],
    conclusion: undefined,
    error: null,
    finalSolution: []
  };
  let T = [[]];
  let C = [[]];
  let D = [[]];
  let L = [[]];
  let U = [[]];
  let error = tol + 1;
  let count = 0;
  let xAnt;
  let x;
  // Check if some elements from the diagonal are 0
  if (zeroInDiagonal(matrixA)) {
    throw Error("Some elements in the diagonal are 0. The method cannot be executed.");
  } 
  if (NMax < 0 ) {
    throw Error("Max iterations is < 0: iterations = " + NMax);
  } 
  if(tol < 0 ) {
    throw Error("tol is an incorrect value: tol + " + tol);
  } 
  // Check if det(A) = 0
  if (det(matrixA) === 0) {
    throw Error("det(A) is 0. The method cannot be executed.");
  }
  D = diag(diag(matrixA));
  L = add(unaryMinus(tril(matrixA)), D); // L = -lowerTriangle + D
  U = add(unaryMinus(triu(matrixA)), D); // U = -upperTriangle + D
  if (l === 1) {
    // Jacobi
    T = multiply(inv(D), add(L, U));
    C = multiply(inv(D), B);
  } else if (l === 2) {
    // Gauss-Seidel
    T = multiply(inv(subtract(D, L)), U);
    C = multiply(inv(subtract(D, L)), B);
  } else {
    // SOR
    T = multiply(
      inv(subtract(D, multiply(w, L))),
      add(multiply(1 - w, D), multiply(w, U))
    );
    C = multiply(multiply(w, inv(subtract(D, multiply(w, L)))), B);
  }
  results.D = D;
  results.L = L;
  results.U = U;
  results.C = C;
  results.T = T;
  results.spectralRadiance = max(abs(eig(T).lambda.x));
  if (results.spectralRadiance > 1) {
    results.error =
      "Error : the spectral radiance is superior to 1, the method cannot be executed";
    return results;
  }
  xAnt = deepCopyFunction(initialValueX0);
  results.iterations.push([count, undefined, xAnt]);
  while (error > tol && count < NMax) {
    x = add(multiply(T, xAnt), C);

    if (normValue === 1 || normValue === "inf") {
      error = norm(subtract(xAnt, x), normValue);
    }
    //normP only accepts norms other different of 1 and inf
    else {
      error = normP(subtract(xAnt, x), normValue);
    }

    xAnt = x;
    count += 1;
    results.iterations.push([count, error, x]);
  }
  // handle the case where it couldn't find with this NMAX
  return results;
};

export default iterativeMethodsFunctions;
