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
  data: { mdx: post },
  location,
}) => {
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        coverURL={post.frontmatter.cover.publicURL}
      />
      <article className="max-w-full md:max-w-2xl mx-auto">
        <header>
          <h1 className="font-extrabold text-3xl md:text-4xl leading-tight text-gray-800 dark:text-gray-200">
            {post.frontmatter.title}
          </h1>
          <PostInfos
            date={post.frontmatter.date}
            tags={post.frontmatter.tags}
            timeToRead={post.timeToRead}
          />
        </header>
        {post.frontmatter.cover ? (
          <Image
            sizes={post.frontmatter.cover.childImageSharp.sizes}
            className="rounded mt-4"
          />
        ) : null}
        <section className="post">
          <MDXRenderer>{post.body}</MDXRenderer>
          <p className="mb-5 text-gray-700 dark:text-gray-200">
            If you found this post useful, feel free to{" "}
            <a
              className="inline-block shadow-sm text-white px-2 py-1 rounded font-semibold"
              style={{ backgroundColor: "#1DA1F2" }}
              href={`https://twitter.com/intent/tweet?text="${post.frontmatter.title}" by @thomas_lombart https://thomlom.dev${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              share it on Twitter.
            </a>
          </p>
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
      <Newsletter />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      timeToRead
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        next
        cover {
          publicURL
          childImageSharp {
            sizes(maxWidth: 2000) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
