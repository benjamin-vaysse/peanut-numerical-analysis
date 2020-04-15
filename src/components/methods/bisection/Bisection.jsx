import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

import bisectionFunction from "./bisectionFunction";

const Bisection = () => {
  const title = "Bisection";
  const pseudoCode = {
    __html:
      "<h3>The user needs to guarantee that the function is continuous in the given interval</h3>" +
      "<h4>Steps</h4>" +
      "<ol>" +
      "<li>Ask the user for a function, a tolerance and a max number of iterations</li>" +
      "<li>Ask the user for the values A and B, these will be the values for the initial interval.</li>" +
      "<li>We create a variable i to count the number of iterations. We begin with 1.</li>" +
      "<li>We evaluate A and B in the function to obtain f(A) and f(B). If f(A) or f(B) = 0, we tell the user that this is the root.</li>" +
      "<li>We make a conditional to being to execute the method… if f(A)*f(B)<=0 then execute… to verify that in the interval there is a root. In the case that there does not exist a root, we tell the user that one does not exist. </li>" +
      "<li>Error=(A+B)/2^i</li>" +
      "<li>while the error > tolerance, i < number of max iterations, f(M)!=0, f(A)*f(B)<0, do: </li>" +
      "<ol type='a'>" +
      "<li>If f(A)*f(M) < 0:" +
      "<ol type='i'>" +
      "<li>B=M</li>" +
      "<li>f(B) =f(M)</li>" +
      "<li>M = (A+B)/2 </li>" +
      "<li>f(M) = the new value of M evaluated in the function</li>" +
      "<li>i=i+1</li>" +
      "<li>Error = (A+B)/2^i</li>" +
      "</ol>" +
      "</li>" +
      "<li>If f(M)*f(B) < 0:" +
      "<ol type='i'>" +
      "<li>A=M</li>" +
      "<li>f(A) =f(M)</li>" +
      "<li>M = (A+B)/2 </li>" +
      "<li>f(M) = the new value of M evaluated in the function</li>" +
      "<li>i=i+1</li>" +
      "<li>Error = (A+B)/2^i</li>" +
      "</ol>" +
      "</li>" +
      "</ol>" +
      "<li>If error <= tolerance, tell the user that the root is located in the interval [A,B] (with the final values) with an error of : ___(with the final value of the error) </li>" +
      "<li>If f(M) = 0, tell the user that M is the root. </li>" +
      "<li>If i = max number of iterations tell the user that he/she has reached the limit of iterations and the root is in the interval [A,B] (with the final values) with an error of: ___(with the final value of the error).</li>" +
      "</ol>",
  };
  const [functionText, setFunctionText] = useState("ln(sin(x)^2 + 1)-0.5");
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [result, setResult] = useState(bisectionFunction(
    "ln(sin(x)^2 + 1)-0.5",
    0,
    1,
    1e-7,
    100,
  ),);
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setLowValue(event.target.lowValue.value);
    setHighValue(event.target.highValue.value);
    setTol(event.target.tol.value);
    setResult(
      bisectionFunction(
        event.target.functionText.value,
        parseFloat(event.target.lowValue.value),
        parseFloat(event.target.highValue.value),
        parseInt(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method title={title} pseudoCode={pseudoCode}>
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input
                type="text"
                name="functionText"
                placeholder="ln(sin(x)^2 + 1)-0.5"
              />
            </label>
            <label>
              Lower interval value (a)
              <input type="text" name="lowValue" placeholder="0" />
            </label>
            <label>
              Higher interval value (b)
              <input type="text" name="highValue" placeholder="1" />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" placeholder="1e-7" />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" placeholder="100" />
            </label>
            <button>Run</button>
          </form>
        </Parameters>
        <Eval>
          <strong>{title}</strong>
          <Params>
            <ul>
              <li>The input function : {functionText}</li>
              <li>Input a : {lowValue}</li>
              <li>Input b : {highValue}</li>
              <li>Tolerance (Tol) : {tol}</li>
              <li>Result : <strong>{result && result[7]}</strong></li>
              <li>Last a : {result && result[0]}</li>
              <li>Last b : {result && result[1]}</li>
              <li>Last m : {result && result[2]}</li>
              <li>f(a) : {result && result[3]}</li>
              <li>f(b) : {result && result[4]}</li>
              <li>Error : {result && result[5]}</li>
              <li>Number of iterations : {result && result[6]}</li>
            </ul>
          </Params>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default Bisection;
