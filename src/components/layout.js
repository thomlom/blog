import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";

import GlobalStyle from "../styles/global";

const Wrapper = styled.div`
  max-width: 700px;
  margin: auto;

  @media screen and (max-width: 768px) {
    padding: var(--p-4);
  }
`;

const Title = css`
  font-weight: 900;
  color: var(--grey-800);

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MainTitle = styled.h1`
  ${Title}
  font-size: var(--text-4xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondaryTitle = styled.h3`
  ${Title}
  font-size: var(--text-2xl);
  text-decoration: underline;
`;

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  let header;
  if (location.pathname === rootPath) {
    header = (
      <MainTitle>
        <Link to={"/"}>{title}</Link>
      </MainTitle>
    );
  } else {
    header = (
      <SecondaryTitle>
        <Link to={"/"}>{title}</Link>
      </SecondaryTitle>
    );
  }

  return (
    <Wrapper>
      <GlobalStyle />
      {header}
      {children}
    </Wrapper>
  );
}

export default Layout;
