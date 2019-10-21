import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PostTitle = styled.h1`
  margin: 0.2rem 0;
  font-weight: 900;
  font-size: var(--text-4xl);
  line-height: 1.25;
  color: var(--grey-800);

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--m-1);
`

const Date = styled.small`
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--grey-500);
`

const CustomLink = styled.a`
  font-size: var(--text-base);
  font-weight: 700;
  color: #38a1f3;

  svg {
    width: 30px;
    height: 30px;
    fill: currentColor;
  }
`

const Content = styled.div`
  font-size: var(--text-base);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: var(--m-6);
    margin-bottom: var(--m-2);
    color: var(--grey-800);
    font-weight: 900;
  }

  h1 {
    font-size: var(--text-4xl);
    line-height: 1.25;
  }

  h2 {
    font-size: var(--text-3xl);
    line-height: 1.25;
  }

  h3 {
    font-size: var(--text-2xl);
    line-height: 1.25;
  }

  h4 {
    font-size: var(--text-xl);
    line-height: 1.25;
  }

  ol,
  ul,
  p {
    color: var(--grey-700);
    font-size: var(--text-base);
    line-height: 1.5;
    margin: var(--m-4) 0;
  }

  li {
    margin: var(--m-2) 0;
  }

  a {
    color: var(--grey-900);
    font-weight: 600;
  }

  blockquote {
    margin: 0;
    border-left: 3px solid var(--grey-700);
    padding-left: 1rem;
    font-style: italic;
    word-wrap: break-word;
  }

  hr {
    border: 1px solid var(--grey-500);
  }
`

const ArticlesLink = styled.div`
  margin: var(--m-6) 0;
  background-color: var(--grey-800);
  border-radius: var(--small-radius);
  box-shadow: var(--shadow-medium);

  padding: var(--m-2) var(--m-4);

  a {
    text-decoration: none;

    p:first-of-type {
      color: var(--grey-100);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      font-size: var(--text-xl);
    }

    p:last-of-type {
      margin-top: var(--m-2);
      font-weight: 700;
      font-size: var(--text-3xl);
      color: var(--grey-white);
    }
  }
`

function BlogPostTemplate({
  data: {
    markdownRemark: post,
    site: {
      siteMetadata: { title },
    },
  },
  pageContext: { next },
  location,
}) {
  return (
    <Layout location={location} title={title}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        cover={post.frontmatter.cover.publicURL}
      />
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <Subtitle>
        <Date>
          {post.frontmatter.date} | {post.timeToRead} minutes
        </Date>
        <CustomLink
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text="${post.frontmatter.title}"%20by%20@thomas_lombart https://thomlom.dev${location.pathname}`}
          target="_blank"
          data-size="large"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="twitter"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            />
          </svg>
        </CustomLink>
      </Subtitle>
      <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      <ArticlesLink>
        <Link to={next.fields.slug} rel="next">
          <p>Your next article</p>
          <p>{next.frontmatter.title}</p>
        </Link>
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
        cover {
          publicURL
        }
      }
    }
  }
`
