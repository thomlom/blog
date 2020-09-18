import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import TransitionLink from "../components/transitionLink"
import Layout from "../components/layout"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"

const BlogPostTemplate = ({
  pageContext: { next },
  data: {
    mdx: post,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => {
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.seoTitle || post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        coverURL={siteUrl + post.frontmatter.cover.publicURL}
      />
      <article className="max-w-full sm:max-w-2xl">
        <header>
          <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight text-gray-800 dark:text-gray-200">
            {post.frontmatter.title}
          </h1>
          <div className="mt-2">
            <PostInfos
              date={post.frontmatter.date}
              tags={post.frontmatter.tags}
            />
          </div>
        </header>
        {post.frontmatter.cover && (
          <>
            <Img
              fluid={post.frontmatter.cover.childImageSharp.fluid}
              className="rounded-lg mt-4"
            />
            {post.frontmatter.coverCredit && (
              <p className="mt-2 text-gray-600 text-center">
                {post.frontmatter.coverCredit}
              </p>
            )}
          </>
        )}
        <section className="mt-6">
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
        {next && (
          <TransitionLink paintDrip to={next.fields.slug}>
            <div className="p-4 border shadow-lg rounded-lg bg-gray-200 dark:bg-gray-800 dark:border-none my-2">
              <span className="uppercase text-sm text-gray-700 dark:text-gray-300 tracking-wide flex items-center font-semibold">
                <span role="img" aria-label="Eyes" className="mr-1 text-xl">
                  👀
                </span>
                This post may also interest you
              </span>
              <p className="text-gray-800 dark:text-gray-200 text-2xl font-bold mt-1 leading-tight underline">
                {next.frontmatter.title}
              </p>
            </div>
          </TransitionLink>
        )}
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        seoTitle
        description
        date(formatString: "MMMM DD, YYYY")
        tags
        next
        cover {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        coverCredit
      }
    }
  }
`
