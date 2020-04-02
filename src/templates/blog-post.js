import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "./ads.css"

import TransitionLink from "../components/transitionLink"
import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"

const BlogPostTemplate = ({ pageContext, data: { mdx: post }, location }) => {
  const adsRef = React.useRef()
  React.useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CE7DE27L&placement=thomlomdev"
    script.async = true
    script.type = "text/javascript"
    script.id = "_carbonads_js"
    adsRef.current.appendChild(script)
  }, [])

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
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
            quick={post.frontmatter.quick}
          />
        </header>
        {post.frontmatter.cover ? (
          <Image
            sizes={post.frontmatter.cover.childImageSharp.sizes}
            className="rounded mt-4"
          />
        ) : null}
        <div ref={adsRef} />
        <section className="post mt-4">
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
      </article>
      {pageContext.next && (
        <>
          <TransitionLink paintDrip to={pageContext.next.fields.slug}>
            <div className="p-4 border border-gray-400 rounded bg-gray-200 dark:bg-gray-800 dark:border-none">
              <span className="uppercase text-sm text-gray-700 dark:text-gray-300 tracking-wide flex items-center">
                <span role="img" aria-label="Eyes" className="mr-1 text-xl">
                  👀
                </span>
                This post may also interest you
              </span>
              <p className="text-gray-800 dark:text-gray-200 text-2xl font-bold mt-1 leading-tight">
                {pageContext.next.frontmatter.title}
              </p>
            </div>
          </TransitionLink>
          <hr className="border-gray-400 mt-8" />
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
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        quick
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
