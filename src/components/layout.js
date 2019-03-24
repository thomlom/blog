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
