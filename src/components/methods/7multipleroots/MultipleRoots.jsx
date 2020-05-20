import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkIcon,
} from "../../../containers/BigContainer";
import multipleRootsFunction from "./multipleRootsFunction";
import { methods } from "../../../data/methods";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MultipleRoots = ({ name }) => {
  const [functionText, setFunctionText] = useState("exp(x) - x - 1");
  const [firstDerivate, setFirstDerivate] = useState("exp(x) - 1");
  const [secondDerivate, setSecondDerivate] = useState("exp(x)");
  const [initialValueX0, setInitialValueX0] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    multipleRootsFunction(
      "exp(x) - x - 1",
      "exp(x) - 1",
      "exp(x)",
      1,
      1e-7,
      100,
    ),
  );
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      parse(event.target.firstDerivate.value);
      parse(event.target.secondDerivate.value);
      setFunctionText(event.target.functionText.value);
      setFirstDerivate(event.target.firstDerivate.value);
      setSecondDerivate(event.target.secondDerivate.value);
      setInitialValueX0(event.target.initialValueX0.value);
      setTol(event.target.tol.value);
      setResults(
        multipleRootsFunction(
          event.target.functionText.value,
          event.target.firstDerivate.value,
          event.target.secondDerivate.value,
          parseFloat(event.target.initialValueX0.value),
          parseFloat(event.target.tol.value),
          parseInt(event.target.maxCount.value),
        ),
      );
      setError(null);
    } catch (e) {
      if (e instanceof TypeError) {
        setError("The function you entered cannot be parsed");
      } else {
        setError(e + "");
      }
      setResults([]); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 6)}
      next={methods.find(method => method.index === 8)}
    >
      <LinkIcon to={"/graph?function=" + encodeURIComponent(functionText)}>
        Graph f(x) = {functionText}
      </LinkIcon>
      {" or "}
      <LinkIcon to={"/graph?function=" + encodeURIComponent(firstDerivate)}>
        Graph f'(x) = {firstDerivate}
      </LinkIcon>
      {" or "}
      <LinkIcon to={"/graph?function=" + encodeURIComponent(secondDerivate)}>
        Graph f''(x) = {secondDerivate}
      </LinkIcon>
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
              />
            </label>
            <label>
              Function f' (first derivative of f)
              <input
                type="text"
                name="firstDerivate"
                defaultValue={firstDerivate}
              />
            </label>
            <label>
              Function f'' (second derivative of f)
              <input
                type="text"
                name="secondDerivate"
                defaultValue={secondDerivate}
              />
            </label>
            <label>
              Initial value (x0)
              <input
                type="text"
                name="initialValueX0"
                defaultValue={initialValueX0}
              />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" defaultValue={tol} />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" defaultValue={100} />
            </label>
            <Button>Run</Button>
          </form>
        </Parameters>
        <Eval>
          <strong>{name}</strong>
          {!error ? (
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteration (i)</th>
                    <th>xi</th>
                    <th>f(xi)</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  {results.iterations.map((result, index) => {
                    return (
                      <tr key={index}>
                        <td>{result[0]}</td>
                        <td>{result[1]}</td>
                        <td>{result[2]}</td>
                        <td>{result[3]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>{results.conclusion}</p>
            </TableStyle>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default MultipleRoots;
