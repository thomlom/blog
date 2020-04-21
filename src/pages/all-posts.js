import React from "react"
import { graphql } from "gatsby"

import Newsletter from "../components/newsletter"
import Layout from "../components/layout"
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
          <article key={node.fields.slug} className="first:mt-2 mt-8">
            <header>
              <h3 className="inline-block text-xl sm:text-2xl font-bold hover:underline leading-tight text-gray-800 dark:text-gray-200">
                <TransitionLink to={node.fields.slug}>{title}</TransitionLink>
              </h3>
              <div className="mt-2">
                <PostInfos
                  date={node.frontmatter.date}
                  tags={node.frontmatter.tags}
                />
              </div>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
                className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-relaxed"
              />
            </section>
            <TransitionLink to={node.fields.slug}>
              <p className="inline-block mt-3 text-base sm:text-lg font-bold text-gray-800 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-gray-200">
                Read more
              </p>
            </TransitionLink>
          </article>
        )
      })}
      <div className="mt-8">
        <Newsletter />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
