import React, { useState } from "react";
import Method from "../Method";
import {
  MediaContainer,
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkGraph,
  Results,
  Question,
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
  const [displayHelp, setDisplayHelp] = useState(false);
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
      setError(e + "");
      setResults({
        iterations: [],
        conclusion: undefined,
      }); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 6)}
      next={methods.find(method => method.index === 8)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/7multipleroots/multipleRootsFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/7multipleroots/pseudoCode/multipleRoots.pdf"
      }
    >
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(functionText)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph f(x) = {functionText}
        </a>
      </LinkGraph>
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(firstDerivate)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph f'(x) = {firstDerivate}
        </a>
      </LinkGraph>
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(secondDerivate)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph f''(x) = {secondDerivate}
        </a>
      </LinkGraph>
      <MediaContainer width={"900px"}>
        <Parameters width={"900px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <p>
            You need to make sure that the function in continuous for the given
            interval. To do so, you should{" "}
            <a
              href={"/graph?function=" + encodeURIComponent(functionText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              plot the function
            </a>
            .
          </p>
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
          <p>
            <strong>{name}</strong>
          </p>
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
            <Results>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </Results>
          )}
        </Eval>
      </MediaContainer>
      <Question
        onClick={() => setDisplayHelp(!displayHelp)}
        active={displayHelp}
      >
        Help
        <FontAwesomeIcon
          icon={displayHelp ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {displayHelp && (
        <React.Fragment>
          <p>
          The convergence decreases or stops if there is any division by zero.
          </p>
          <p>Be sure the derivatives of the function are correct.</p>
          <p>The function must be continuous and differentiable.</p>
          <p>Tolerance must have a positive value.</p>
          <p>The iteration number must be positive.</p>
        </React.Fragment>
      )}
    </Method>
  );
};

export default MultipleRoots;
