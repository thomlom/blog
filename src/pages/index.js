import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Contact from "../components/contact"
import Post from "../components/post"
import SEO from "../components/seo"

const Bio = ({ photo }) => {
  return (
    <div className="rounded-lg flex flex-col sm:flex-row sm:items-center">
      <div>
        <Img
          fixed={photo.childImageSharp.fixed}
          className="rounded-full border-4 border-gray-700 shadow"
        />
      </div>
      <div className="mt-4 sm:ml-8 sm:mt-0">
        <h2 className="text-2xl sm:text-3xl text-gray-100 font-extrabold leading-tight">
          Hey, I'm Thomas Lombart.
        </h2>
        <h3 className="text-xl sm:text-2xl text-gray-200 font-semibold leading-snug mt-2">
          I'm a front-end engineer from France. I love designing and building
          great apps.
        </h3>
      </div>
    </div>
  )
}

const LatestPosts = ({ posts }) => (
  <div>
    <h4 className="text-center rounded bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 mb-4 uppercase text-lg sm:text-xl tracking-wide font-extrabold p-2 text-white">
      Latest posts
    </h4>
    <div className="mt-6 space-y-8">
      {posts.map(({ node }) => (
        <Post key={node.fields.slug} node={node} />
      ))}
    </div>
  </div>
)

const BlogIndex = ({
  location,
  data: {
    site: {
      siteMetadata: { description },
    },
    photo,
    allMdx,
  },
}) => {
  const posts = allMdx.edges.slice(0, 3)

  return (
    <Layout location={location}>
      <SEO description={description} />
      <div className="mt-2 space-y-6 sm:space-y-10">
        <Bio photo={photo} />
        <LatestPosts posts={posts} />
        <Contact />
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
    photo: file(absolutePath: { regex: "/photo.jpeg/" }) {
      publicURL
      childImageSharp {
        fixed(width: 150) {
          ...GatsbyImageSharpFixed
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
            description
            tags
          }
        }
      }
    }
  }
`
