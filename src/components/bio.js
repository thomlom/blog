import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

const BioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(210, 36%, 96%);
  border-radius: 15px;
  padding: 3rem;

  @media screen and (max-width: 600px) {
    padding: 1rem;
    flex-direction: column;
  }
`

const Picture = styled(Image)`
  margin-bottom: 0;
  min-width: 100px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`

const Link = styled.a`
  color: hsl(209, 61%, 16%);
`

const Description = styled.p`
  margin-left: 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: hsl(209, 28%, 39%);
  line-height: 2.4rem;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const {
          author,
          social: { twitter: twitterUsername, github: githubUsername },
        } = data.site.siteMetadata

        return (
          <BioContainer>
            <Picture fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <Description>
              Front-end developer with industry experience specializing in
              JavaScript technologies such as React and Vue. I build
              user-focused apps with UX, testing and performance constraints in
              mind. I write articles, give workshops and contribute to open
              source on my spare time. Follow me on{' '}
              <Link href={`https://twitter.com/${twitterUsername}`}>
                Twitter
              </Link>{' '}
              &amp;{' '}
              <Link href={`https://github.com/${githubUsername}`}>GitHub</Link>.
            </Description>
          </BioContainer>
        )
      }}
    />
  )
}

const bioQuery = graphql`
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
`

export default Bio
