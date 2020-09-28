import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import Post from "../components/post"
import SEO from "../components/seo"

const Bio = ({ photo }) => {
  return (
    <div className="rounded-lg flex flex-col sm:flex-row sm:items-center">
      <div>
        <Img
          fixed={photo.childImageSharp.fixed}
          className="rounded-lg shadow"
        />
      </div>
      <div className="mt-4 sm:ml-8 sm:mt-0">
        <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-gray-100 font-extrabold leading-tight">
          Hey, I'm Thomas Lombart.
        </h2>
        <h3 className="text-lg sm:text-2xl text-gray-800 dark:text-gray-200 font-semibold leading-snug mt-2">
          I'm a senior front-end engineer. I help developers getting more
          efficient and productive through articles.
        </h3>
      </div>
    </div>
  )
}

const BlogDescription = () => (
  <div className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 shadow rounded-lg p-3 sm:p-6">
    <p className="font-extrabold uppercase tracking-wider">
      What's in this blog?
    </p>
    <p className="mt-2 sm:text-lg">
      My goal is to make you more efficient and productive. You can expect
      articles on tools (VS Code, your terminal, etc.) and productivity (time
      management, reducing meetings, soft skills).
    </p>
    <p className="mt-1 sm:text-lg">
      Feel free to browse{" "}
      <Link to="/all-posts" className="underline font-semibold">
        all my posts
      </Link>
      , learn more{" "}
      <Link to="/about" className="underline font-semibold">
        about me
      </Link>
      , or{" "}
      <a
        href="mailto:t.lombart97@gmail.com"
        className="underline font-semibold"
        target="_blank"
        rel="noopener noreferrer"
      >
        get in touch!
      </a>
    </p>
  </div>
)

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
      <SEO title="Blog" description={description} />
      <div className="mt-2 space-y-6 sm:space-y-10">
        <Bio photo={photo} />
        <BlogDescription />
        <LatestPosts posts={posts} />
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
        fixed(width: 175) {
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
