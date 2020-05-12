import { rationalize } from "mathjs";

const newtonInterpolationFunction = points => {
  let results = {
    polynom: undefined,
    dividedDifference: undefined,
  };
  let expression = "";
  let degree = points.x.length;
  // Create a square matrix to hold the pyramid
  let pyramid = Array(degree);
  for (let i = 0; i < degree; i++) {
    pyramid[i] = new Array(degree).fill(0);
    for (let j = 0; j < degree; j++) {
      // The first column is just y
      if (j === 0) pyramid[i][j] = parseFloat(points.y[i]);
    }
  }
  for (let j = 1; j < degree; j++) { // we start with the second column
    for (let i = 0; i < degree - j; i++) { // create pyramid by updating other columns
      pyramid[i][j] =
        (pyramid[i + 1][j - 1] - pyramid[i][j - 1]) /
        (points.x[i + j] - points.x[i]);
    }
  }
  // the resulting coefficients are in pyramid[0]
  // Now we
  for (let i = 0; i < degree; i++) {
    if (i === 0) {
      if (pyramid[0][i] < 0) {
        expression += "-" + pyramid[0][i];
      } else {
        expression += pyramid[0][i];
      }
    } else {
      if (pyramid[0][i] >= 0) {
        expression += " + " +  pyramid[0][i];
      } else {
        expression += " " + pyramid[0][i];
      }
      for (let j = 0; j < i; j++) {
        if (points.x[j] < 0) {
          expression += "(x+" + -points.x[j] + ")";
        }
        else if (points.x[j] === 0) {
          expression += "(x)";
        }
        else {
          expression += "(x-" + points.x[j] + ")";
        }
      }
    }
  }
  results.dividedDifference = pyramid;
  results.polynom = rationalize(expression).toTex({ // We get simple polynomials via the rationalize() function
    // e.g. : rationalize("(x-1)(x)") = "x^2 - x"
    parenthesis: 'auto',    // parenthesis option
    implicit: 'show'        // how to treat implicit multiplication
  });

  return results;
};

export default newtonInterpolationFunction;
