import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
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
              <h3 className="inline-block text-2xl md:text-3xl text-gray-800 font-bold hover:underline leading-tight">
                <Link to={node.fields.slug}>{title}</Link>
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
                className="mt-4 text-base text-gray-700 leading-relaxed"
              />
            </section>
            <Link to={node.fields.slug}>
              <p className="inline-block mt-3 text-primary-600 font-bold text-lg hover:underline hover:text-primary-700">
                Read →
              </p>
            </Link>
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
