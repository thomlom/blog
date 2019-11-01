import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";

import GlobalStyle from "../styles/global";
import Bio from "../components/bio";

const Title = css`
  font-weight: 900;
  color: var(--grey-800);

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;

  @media screen and (max-width: 768px) {
    padding: var(--p-4);
  }
`;

const MainHeader = styled.header`
  background-image: linear-gradient(
    135deg,
    var(--blue-600) 10%,
    var(--blue-900) 100%
  );
  padding: var(--m-6) var(--m-4) var(--m-8) var(--m-4);

  @media screen and (max-width: 480px) {
    padding: var(--m-3);
  }

  h1 {
    ${Title}
    margin: 0;
    font-size: var(--text-4xl);
    color: var(--blue-white);
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 480px) {
      font-size: var(--text-3xl);
    }
  }

  section {
    margin-top: var(--m-6);

    @media screen and (max-width: 480px) {
      margin-top: var(--m-3);
    }
  }
`;

const SecondaryTitle = styled.h3`
  ${Title}
  font-size: var(--text-3xl);
  text-decoration: underline;

  @media screen and (max-width: 480px) {
    margin: var(--m-2) 0 0 0;
  }
`;

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  let header;
  if (location.pathname === rootPath) {
    header = (
      <MainHeader>
        <Wrapper>
          <h1>
            <Link to={"/"}>{title}</Link>
          </h1>
          <section>
            <Bio />
          </section>
        </Wrapper>
      </MainHeader>
    );
  } else {
    header = (
      <Wrapper>
        <SecondaryTitle>
          <Link to={"/"}>{title}</Link>
        </SecondaryTitle>
      </Wrapper>
    );
  }

  return (
    <div>
      <GlobalStyle />
      {header}
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

export default Layout;
