import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import Post from "../components/post"
import SEO from "../components/seo"

const Bio = ({ photo }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="hidden sm:block">
        <Img
          fixed={photo.childImageSharp.fixed}
          className="rounded-full border-2 border-gray-100 hidden"
        />
      </div>
      <div className="sm:ml-8 sm:mt-0">
        <h2 className="text-xl sm:text-2xl text-white font-extrabold leading-tight">
          Hey, I'm Thomas Lombart.{" "}
          <span role="img" aria-label="Waving hand">
            👋
          </span>
        </h2>
        <h3 className="text-lg text-white font-semibold leading-snug mt-2">
          I'm a front-end engineer. I'm here to help you level-up your career
          through posts on JavaScript, Vue and more!
        </h3>
      </div>
    </div>
  )
}

const BlogIndex = ({
  data: {
    site: {
      siteMetadata: { description },
    },
    photo,
    allMdx,
  },
}) => {
  const posts = allMdx.edges.slice(0, 4)

  return (
    <Layout>
      <SEO title="Blog" description={description} />
      <div className="space-y-4 sm:space-y-8">
        <Bio photo={photo} />
        <div className="p-4 sm:p-8 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <h4 className="mb-4 uppercase text-lg tracking-wide text-gray-800 dark:text-gray-100 font-extrabold">
            <span role="img" aria-label="hand holding a pen">
              ✍
            </span>{" "}
            Blog
          </h4>
          <div className="space-y-8">
            {posts.map(({ node }) => (
              <Post key={node.fields.slug} node={node} />
            ))}
            <Link to="/all-posts" className="block">
              <button className="w-full p-3 sm:p-4 bg-gray-800 dark:bg-gray-300 sm:text-lg text-gray-100 dark:text-gray-800 rounded-lg shadow font-bold">
                See all posts
              </button>
            </Link>
          </div>
        </div>
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
    photo: file(absolutePath: { regex: "/photo.jpeg/" }) {
      publicURL
      childImageSharp {
        fixed(width: 125) {
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
            tags
          }
        }
      }
    }
  }
`
