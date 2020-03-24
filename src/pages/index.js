import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import TransitionLink from "../components/transitionLink"
import SEO from "../components/seo"

const BlogIndex = ({
  data: {
    site: {
      siteMetadata: { description },
    },
    allMdx,
  },
  location,
}) => {
  const posts = allMdx.edges

  return (
    <Layout location={location}>
      <SEO title="All posts" description={description} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="first:mt-0 mt-8">
            <header>
              <h3 className="inline-block text-2xl md:text-3xl text-gray-800 dark:text-gray-300 font-bold dark:font-semibold hover:underline leading-tight">
                <TransitionLink to={node.fields.slug}>{title}</TransitionLink>
              </h3>
              <PostInfos
                date={node.frontmatter.date}
                tags={node.frontmatter.tags}
                quick={node.frontmatter.quick}
              />
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
                className="mt-4 text-base text-gray-700 dark:text-gray-400 leading-relaxed"
              />
            </section>
            <TransitionLink to={node.fields.slug}>
              <p className="inline-block mt-3 text-primary-600 dark:text-primary-300 font-bold text-lg hover:text-primary-700 dark:hover:text-primary-200">
                Read →
              </p>
            </TransitionLink>
          </article>
        )
      })}
      <Newsletter />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            quick
          }
        }
      }
    }
  }
`
