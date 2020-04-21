import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

const marginBetweenSections = "mt-6 sm:mt-10"

const PostSection = ({ title, posts }) => {
  return (
    <div className={marginBetweenSections}>
      <h4 className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 uppercase tracking-wide font-extrabold">
        {title}
      </h4>
      <div className="sm:mt-1 h-1 gradient-right rounded w-full -p-4"></div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="mt-3 mb-6">
            <header>
              <h3 className="inline-block font-bold hover:underline leading-tight text-lg sm:text-xl text-gray-900 dark:text-gray-200 ">
                <TransitionLink to={node.fields.slug}>{title}</TransitionLink>
              </h3>
              <div className="mt-1">
                <PostInfos
                  date={node.frontmatter.date}
                  tags={node.frontmatter.tags}
                />
              </div>
            </header>
          </article>
        )
      })}
    </div>
  )
}

const BlogIndex = ({
  data: {
    site: {
      siteMetadata: { description, siteUrl },
    },
    illustration,
    allMdx,
  },
}) => {
  const posts = allMdx.edges

  const latestPosts = posts.slice(0, 5)

  const popularPosts = posts.filter(
    ({
      node: {
        frontmatter: { popular },
      },
    }) => popular
  )

  return (
    <Layout>
      <SEO
        description={description}
        coverURL={siteUrl + illustration.publicURL}
      />
      <Img
        fluid={illustration.childImageSharp.fluid}
        className="rounded-lg my-0"
      />
      <PostSection title="Latest posts 🚀" posts={latestPosts} />
      <PostSection title="Popular posts 😍" posts={popularPosts} />
      <div className={marginBetweenSections}>
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
    illustration: file(absolutePath: { regex: "/illustration.png/" }) {
      publicURL
      childImageSharp {
        fluid(maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
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
            popular
          }
        }
      }
    }
  }
`
