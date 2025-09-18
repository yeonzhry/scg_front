import React from "react";
import styled from "styled-components";
// import logo from "../../assets/images/logo.svg";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #121212;

`;

const Logo = styled.div`
  img {
    width: 40px;
    height: auto;
    padding-top: 10px;
    margin-left: 50px;
  }
`;

const NavMenu = styled.nav`
  ul {
    font-family: "timeline-210", sans-serif;
    font-weight: 400;
    display: flex;
    list-style: none;
    margin-right: 50px;
    padding-top: 20px;
    gap: 30px;
  }

  li {
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
    color: #000;
    font-weight: 400;
    transition: color 0.2s ease;

    &:hover {
      color: #666;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
        <img src="./images/logo.svg" alt="Logo" />
      </Logo>
      <NavMenu>
        <ul>
          <li><a href="#about">( About )</a></li>
          <li><a href="#howto">( How to? )</a></li>
          <li><a href="#archive">( Archive )</a></li>
        </ul>
      </NavMenu>
    </HeaderWrapper>
  );
};

export default Header;
