import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PostTitle = styled.h1`
  margin: 0.2rem 0;
  font-weight: 900;
  font-size: 4rem;
  color: hsl(211, 39%, 23%);
`

const Date = styled.small`
  font-size: 1.2rem;
  font-weight: 600;
  color: hsl(210, 22%, 49%);
`

const Content = styled.div`
  font-size: 1.6rem;
  line-height: 2.6rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 4rem;
    margin-bottom: 2rem;
    color: hsl(211, 39%, 23%);
    font-weight: 900;
  }

  h1 {
    font-size: 3.6rem;
    line-height: 4rem;
  }

  h2 {
    font-size: 3rem;
    line-height: 3.5rem;
  }

  h3 {
    font-size: 2.4rem;
    line-height: 3rem;
  }

  h4 {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  ol,
  ul,
  p {
    color: hsl(209, 34%, 30%);
    font-size: 1.6rem;
    line-height: 2.6rem;
    margin: 2.4rem 0;
  }

  li {
    margin: 1.2rem 0;
  }

  a {
    color: hsl(209, 61%, 16%);
    font-weight: 600;
  }

  blockquote {
    margin: 0;
    margin-left: 2rem;
    border-left: 3px solid hsl(209, 34%, 30%);
    padding-left: 1rem;
    font-style: italic;
  }

  hr {
    border: 1px solid hsl(210, 22%, 49%);
  }
`

const Separator = styled.hr`
  border: 0.5px solid hsl(210, 31%, 80%);
`

const ArticlesLink = styled.ul`
  padding: 0;
  margin: 1.6rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  list-style: none;

  li a {
    color: hsl(209, 61%, 16%);
  }
`

function BlogPostTemplate({
  data: {
    markdownRemark: post,
    site: {
      siteMetadata: { title },
    },
  },
  pageContext: { previous, next },
  location,
}) {
  return (
    <Layout location={location} title={title}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <Date>
        {post.frontmatter.date} | {post.timeToRead} minutes
      </Date>
      <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      <Separator />
      <ArticlesLink>
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ArticlesLink>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      timeToRead
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
