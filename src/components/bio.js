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
        const { author } = data.site.siteMetadata

        return (
          <BioContainer>
            <Picture fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <Description>
              Passionate and highly motivated front-end developer. I build
              user-focused apps in my everyday life. I love sharing my knowledge
              as well as learning from others.
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
      }
    }
  }
`

export default Bio
