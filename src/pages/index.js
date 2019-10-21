import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Post = styled.div`
  margin: 4rem 0;
  display: flex;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const Image = styled.img`
  border-radius: 5px;
  display: block;
  object-fit: cover;
  width: 150px;

  @media (max-width: 480px) {
    width: 100%;
  }
`

const PostContent = styled.div`
  margin-left: 1.6rem;

  @media (max-width: 480px) {
    margin-left: 0;
    margin-top: 1rem;
  }

  h3 {
    margin: 0.2rem 0;
    font-weight: 900;
    font-size: 2.4rem;
    color: var(--grey-800);

    a {
      text-decoration: none;
      box-shadow: none;
      color: inherit;
    }
  }

  small {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--grey-500);
  }

  p {
    font-size: 1.4rem;
    color: var(--grey-700);
    line-height: 2rem;
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--grey-500);

  a {
    color: var(--grey-900);
  }
`

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={['blog', 'javascript', 'front-end', 'react', 'vue']}
      />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Post key={node.fields.slug}>
            <Image src={node.frontmatter.cover.publicURL} />
            <PostContent>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>
                {node.frontmatter.date} | {node.timeToRead} minutes read
              </small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </PostContent>
          </Post>
        )
      })}
      <Footer>
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img
            alt="Licence Creative Commons"
            style={{ borderWidth: '0' }}
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          />
        </a>
        <p>
          Made with <a href="https://www.gatsbyjs.org/">Gatsby</a>
        </p>
      </Footer>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            cover {
              publicURL
            }
          }
        }
      }
    }
  }
`
