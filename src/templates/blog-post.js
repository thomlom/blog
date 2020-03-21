import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data: { mdx: post }, location }) => {
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        coverURL={post.frontmatter.cover.publicURL}
      />
      <article className="max-w-full md:max-w-2xl mx-auto">
        <header>
          <h1 className="font-extrabold text-3xl md:text-4xl leading-tight text-gray-800">
            {post.frontmatter.title}
          </h1>
          <PostInfos
            date={post.frontmatter.date}
            tags={post.frontmatter.tags}
            quick={post.frontmatter.quick}
          />
        </header>
        {post.frontmatter.cover ? (
          <Image
            sizes={post.frontmatter.cover.childImageSharp.sizes}
            className="rounded mt-4"
          />
        ) : null}
        <section className="post mt-4">
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
      </article>
      <Newsletter likeThisPost />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        quick
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
