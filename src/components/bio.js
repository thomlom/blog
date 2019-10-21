import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

const BioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grey-white);
  border-radius: var(--medium-radius);
  box-shadow: var(--shadow-small);
  padding: var(--p-3) var(--p-4);

  @media screen and (max-width: 480px) {
    padding: 1rem;
    flex-direction: column;
  }

  a {
    color: var(--grey-900);
  }

  p {
    margin-left: var(--m-5);
    font-size: var(--text-base);
    font-weight: 500;
    color: var(--grey-600);
    line-height: 1.625;
  }
`

const Picture = styled(Image)`
  margin-bottom: 0;
  min-width: 100px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`

function Bio() {
  const {
    site: { siteMetadata },
    avatar,
  } = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/pic.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const {
    author,
    social: { twitter: twitterUsername, github: githubUsername },
  } = siteMetadata

  return (
    <BioContainer>
      <Picture fixed={avatar.childImageSharp.fixed} alt={author} />
      <p>
        Front-end developer with industry experience specializing in JavaScript
        technologies such as React and Vue. I build user-focused apps with UX,
        testing and performance constraints in mind. I write articles, give
        workshops and contribute to open source on my spare time. Follow me on{' '}
        <a href={`https://twitter.com/${twitterUsername}`}>Twitter</a> &amp;{' '}
        <a href={`https://github.com/${githubUsername}`}>GitHub</a>.
      </p>
    </BioContainer>
  )
}

export default Bio
