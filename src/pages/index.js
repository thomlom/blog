import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

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
    illustration,
    allMdx,
  },
  location,
}) => {
  const posts = allMdx.edges

  return (
    <Layout location={location}>
      <SEO title="All posts" description={description} />
      <Img
        fluid={illustration.childImageSharp.fluid}
        className="rounded-lg my-0"
      />
      {posts.map(({ node }, i) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="mt-8">
            <header>
              <h3 className="inline-block text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-bold hover:underline leading-tight">
                <TransitionLink to={node.fields.slug}>{title}</TransitionLink>
              </h3>
              <PostInfos
                date={node.frontmatter.date}
                tags={node.frontmatter.tags}
                timeToRead={node.timeToRead}
              />
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
                className="mt-3 text-base text-gray-700 dark:text-gray-400 leading-relaxed"
              />
            </section>
            <TransitionLink to={node.fields.slug}>
              <p className="inline-block mt-3 text-lg font-bold text-gray-700 hover:text-primary-900 hover:underline dark:text-gray-300 dark:hover:text-primary-200">
                Read more
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
    illustration: file(absolutePath: { regex: "/illustration.png/" }) {
      childImageSharp {
        fluid(maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
