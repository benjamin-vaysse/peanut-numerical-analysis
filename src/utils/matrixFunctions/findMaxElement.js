import { abs } from "mathjs";

const findMaxElement = (M, a, b) => {
  let results = new Array(2);
  let max = 0;
  for (let i = a; i < M.length; i++) {
    for (let j = b; j < M.length; j++) {
      if (abs(M[i][j]) > abs(max)) {
        max = M[i][j];
        results[0] = i;
        results[1] = j;
      }
    }
  }
  return results;
};

export default findMaxElement;
