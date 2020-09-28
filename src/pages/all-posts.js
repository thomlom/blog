import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import Post from "../components/post"
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
  const [search, setSearch] = React.useState("")

  return (
    <Layout location={location}>
      <SEO title="All posts" description={description} />
      <div className="bg-gray-200 p-4 mb-6 rounded-lg dark:bg-gray-800 shadow">
        <label className="block text-lg text-gray-900 dark:text-gray-100 font-bold">
          Search a post
          <input
            type="text"
            className="shadow my-2 text-gray-800 placeholder-gray-700 bg-white focus:outline-none focus:shadow-outline rounded py-2 px-4 block w-full appearance-none dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:placeholder-gray-500"
            placeholder="tools, javascript"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="space-y-10">
        {posts
          .filter(
            ({
              node: {
                frontmatter: { title, tags },
              },
            }) => {
              const lowercasedTitle = title.toLowerCase()
              const lowercasedSearch = search.toLowerCase()
              const wordsSearched = lowercasedSearch
                .split(/[ ,]+/)
                .filter(Boolean)

              if (wordsSearched.length > 0) {
                return (
                  lowercasedTitle.includes(lowercasedSearch) ||
                  tags.some((tag) =>
                    wordsSearched.some((word) => tag.includes(word))
                  )
                )
              }

              return true
            }
          )
          .map(({ node }) => (
            <Post key={node.fields.slug} node={node} />
          ))}
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
            description
            tags
          }
        }
      }
    }
  }
`
