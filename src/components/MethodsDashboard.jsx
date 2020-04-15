import React from "react";
import styled from "styled-components";
import {Link} from "@reach/router";
import { Title, Subtitle } from "../containers/BigContainer";
import {BorderRadius, Colors, Spacing, Typography} from "../rules";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MethodsDashboard = () => {
  const methods = [
    { index: 2, id: "function-evaluator", theme: "one-var", name: "Function evaluator" },
    { index: 3,  id: "incremental-search", theme: "one-var", name: "Incremental search" },
    { index: 4,  id: "get-solution-bisection", theme: "one-var", name: "Bisection" },
    { index: 5,  id: "get-solution-false-position", theme: "one-var", name: "False position" },
    { index: 6,  id: "get-solution-fixed-point", theme: "one-var", name: "Fixed point" },
    { index: 7,  id: "get-solution-newton", theme: "one-var", name: "Newton method" },
    { index: 8,  id: "get-solution-secante", theme: "one-var", name: "Secant method" },
    { index: 9,  id: "get-solution-multiple-roots", theme: "one-var", name: "Multiple roots"},
    { index: 10,  id: "get-solution-others", theme: "one-var", name: "Others (added value)"},
    { index: 11,  id: "matrix", theme: "sys-eq", name: "Matrix"},
    { index: 12,  id: "gauss-elimination-simple", theme: "sys-eq", name: "Gaussian elimination (simple)"},
    { index: 13,  id: "gauss-elimination-partial-piv", theme: "sys-eq", name: "Gaussian elimination (partial pivot)"},
    { index: 14,  id: "gauss-elimination-total-piv", theme: "sys-eq", name: "Gaussian elimination (total pivot)"},
    { index: 15,  id: "direct-factorization-simple", theme: "sys-eq", name: "Gaussian elimination - simple (value added)"},
    { index: 16,  id: "direct-factorization-pivot", theme: "sys-eq", name: "Gaussian elimination - pivot (value added)"},
    { index: 17,  id: "direct-factorization-direct-croult", theme: "sys-eq", name: "Direct factorization (Croult)"},
    { index: 18,  id: "direct-factorization-direct-doolittle", theme: "sys-eq", name: "Direct factorization (Doolittle)"},
    { index: 19,  id: "direct-factorization-direct-cholesky", theme: "sys-eq", name: "Direct factorization (Cholesky)"},
    { index: 20,  id: "direct-factorization-diagonal-matrix", theme: "sys-eq", name: "Diagonal matrix"},
    { index: 21,  id: "iterative-jacobi", theme: "sys-eq", name: "Iterative method : Jacobi"},
    { index: 22,  id: "iterative-jacobi-relaxation", theme: "sys-eq", name: "Iterative relaxation method : Jacobi"},
    { index: 23,  id: "iterative-gauss-seidel", theme: "sys-eq", name: "Iterative method : Gauss Seidel"},
    { index: 24,  id: "iterative-gauss-seidel-relaxation", theme: "sys-eq", name: "Iterative relaxation method : Gauss Seidel"},
    { index: 25,  id: "inter-newton", theme: "interpolation", name: "Newton"},
    { index: 26,  id: "inter-lagrange", theme: "interpolation", name: "Lagrange"},
    { index: 27,  id: "inter-neville", theme: "interpolation", name: "Neville"},
    { index: 28,  id: "inter-splines-linear", theme: "interpolation", name: "Splines (linear)"},
    { index: 29,  id: "inter-splines-square", theme: "interpolation", name: "Splines (quadratic)"},
    { index: 30,  id: "inter-splines-cube", theme: "interpolation", name: "Splines (cubic)"},
  ];
  return (
    <React.Fragment>
      <Title>Methods</Title>
      <Subtitle>30 methods to solve numerical problems</Subtitle>
      <MainContainer>
        <ThemeTitle>
          <FontAwesomeIcon icon={"otter"}/>
          Solving equations of one variable
        </ThemeTitle>
        <Theme>
          {methods.filter(module => {
            return (module.theme === "one-var");
          }).map(module => {
            return (
              <ModuleLink key={module.id} to={module.id}>
                {module.name}
              </ModuleLink>
            )
          })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"horse-head"}/>
          Solution of systems of equations
        </ThemeTitle>
        <Theme>
          {methods.filter(module => {
            return (module.theme === "sys-eq");
          }).map(module => {
            return (
              <ModuleLink key={module.id} to={module.id}>
                {module.name}
              </ModuleLink>
            )
          })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"kiwi-bird"}/>
          Interpolation
        </ThemeTitle>
        <Theme>
          {methods.filter(module => {
            return (module.theme === "interpolation");
          }).map(module => {
            return (
              <ModuleLink key={module.id} to={module.id}>
                {module.name}
              </ModuleLink>
            )
          })}
        </Theme>
      </MainContainer>
    </React.Fragment>
  );
};

const ThemeTitle = styled("div")`
  margin-bottom: ${Spacing.lg};
  font-size: ${Typography.subTitle};
  font-weight: 600;
  svg {
    padding: 0 ${Spacing.md} 0 0;
  }
`;

const Theme = styled("div")`
  margin-bottom: ${Spacing.lg};
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 1370px) {
    grid-template-columns: 300px 300px 300px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: 300px 300px;
  }
  @media (max-width: 730px) {
    grid-template-columns: 300px;
  }
  justify-items: left;
  align-items: flex-start;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl} ;
`;

const ModuleLink = styled(Link)`
  width: 250px;
  padding: ${Spacing.md} ${Spacing.lg};
  border: 2px solid ${Colors.primary.ocean.lighter};
  border-radius: ${BorderRadius.sm};
  &:hover {
    background-color: ${Colors.primary.ocean.darker};
    color: ${Colors.utility.white.default};
    transform: translateY(-3px);
  }
  text-decoration: none;
  
`;

export default MethodsDashboard;