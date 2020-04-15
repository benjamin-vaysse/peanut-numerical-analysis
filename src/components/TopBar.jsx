import React , {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import {Colors, Shadows, Spacing} from "../rules";
import { Link } from "@reach/router";
import logo from "../img/logo0.png";
import ModulesDropDown from "./ModulesDropDown";

const TopBar = () => {
  const node = useRef(null);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const handleClickOutside = event => {
    if (node.current && !node.current.contains(event.target)) {
      setDropDownVisible(false)
    }
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  });
  return (
    <TopBarContainer>
      <Logo>
        <Link to="/">
          <img src={logo} alt={"logo_peanut"} />
        </Link>
      </Logo>
      <ul>
        <li>
          <DropDownClickZone ref={node}>
            <DropDownButton
              onClick={() => setDropDownVisible(!dropDownVisible)}
            >
              Methods
            </DropDownButton>
            {dropDownVisible && (
              <ModulesDropDown
                onClickOnLink={() => setDropDownVisible(!dropDownVisible)}
              />
            )}
          </DropDownClickZone>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/oversight">Oversight</Link>
        </li>
      </ul>
    </TopBarContainer>
  );
};

const TopBarContainer = styled("nav")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
    float: right;
    font-weight: 700;
  }
  ul > li {
    display: inline-block;
  }
  li a {
    display: block;
    color: white;
    text-align: center;
    padding: ${Spacing.md};
    text-decoration: none;
  }
  width: 100%;
  background-color: ${Colors.primary.tan.default};
  border-bottom: 2px solid ${Colors.utility.black.default};
  box-shadow: ${Shadows.level3};
`;

const Logo = styled("div")`
  img {
    width: 70px;
  }
  padding: ${Spacing.md} 26px 12px;
`;

const DropDownButton = styled("button")`
  border: none;
  background-color: inherit;
  color: ${Colors.utility.white.default};
  padding: ${Spacing.md};
  margin: 0;
  cursor: pointer; 
  font-weight: 700;
  font: inherit;
`;

const DropDownClickZone = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  color: ${Colors.utility.white.default};
`;


export default TopBar;
