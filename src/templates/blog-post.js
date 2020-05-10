import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import TransitionLink from "../components/transitionLink"
import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"

const BlogPostTemplate = ({
  pageContext: { slug, next },
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
        description={post.excerpt}
        coverURL={siteUrl + post.frontmatter.cover.publicURL}
      />
      <article className="max-w-full sm:max-w-2xl mx-auto">
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
            <Image
              sizes={post.frontmatter.cover.childImageSharp.sizes}
              className="rounded mt-4"
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
      </article>

      {next && (
        <>
          <TransitionLink paintDrip to={next.fields.slug}>
            <div className="p-4 border shadow-md rounded bg-gray-200 dark:bg-gray-800 dark:border-none dark:shadow-lg">
              <span className="uppercase text-sm text-gray-700 dark:text-gray-300 tracking-wide flex items-center">
                <span role="img" aria-label="Eyes" className="mr-1 text-xl">
                  👀
                </span>
                This post may also interest you
              </span>
              <p className="text-gray-800 dark:text-gray-200 text-2xl font-bold mt-1 leading-tight">
                {next.frontmatter.title}
              </p>
            </div>
          </TransitionLink>
          <hr className="border-gray-400 dark:border-gray-700 mt-5" />
        </>
      )}
      <div className="mt-5">
        <Newsletter />
      </div>
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
        date(formatString: "MMMM DD, YYYY")
        tags
        next
        cover {
          publicURL
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes
            }
          }
        }
        coverCredit
      }
    }
  }
`
