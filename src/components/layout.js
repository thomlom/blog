import React from 'react'
import { Link } from 'gatsby'
import styled, { css, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');

  html {
    font-family: 'Inter', sans-serif;
    font-size: 62.5%;
  }

  html, body {
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled.div`
  max-width: 700px;
  margin: auto;

  @media screen and (max-width: 900px) {
    padding: 2rem;
  }
`

const Title = css`
  font-family: 'Inter';
  font-weight: 900;
  color: hsl(211, 39%, 23%);

  a {
    text-decoration: none;
    color: inherit;
  }
`

const MainTitle = styled.h1`
  ${Title}
  font-size: 3.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MailLink = styled.a`
  display: flex;
  background-color: hsl(210, 36%, 96%);
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 480px) {
    margin-top: 0.5rem;
  }

  svg {
    height: 24px;
    width: 24px;

    .primary {
      fill: hsl(209, 34%, 30%);
    }

    .secondary {
      fill: hsl(210, 22%, 49%);
    }
  }
`

const SecondaryTitle = styled.h3`
  ${Title}
  font-size: 2.4rem;
`

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`

  let header
  if (location.pathname === rootPath) {
    header = (
      <MainTitle>
        <Link to={'/'}>{title}</Link>
        <MailLink href="mailto:t.lombart97@gmail.com">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              className="primary"
              d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"
            />
            <path
              className="secondary"
              d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"
            />
          </svg>
        </MailLink>
      </MainTitle>
    )
  } else {
    header = (
      <SecondaryTitle>
        <Link to={'/'}>{title}</Link>
      </SecondaryTitle>
    )
  }

  return (
    <Wrapper>
      <GlobalStyle />
      {header}
      {children}
    </Wrapper>
  )
}

export default Layout
