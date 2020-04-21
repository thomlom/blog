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
  const [search, setSearch] = React.useState("")

  return (
    <Layout location={location}>
      <SEO title="All posts" description={description} />
      <div className="bg-gray-200 p-4 mb-6 rounded">
        <label className="block text-lg text-gray-800 font-semibold">
          Search a post
          <input
            type="text"
            className="mt-1 mb-2 text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
            placeholder="react, vue"
            onChange={e => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="space-y-8">
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
                  tags.some(tag =>
                    wordsSearched.some(word => tag.includes(word))
                  )
                )
              }

              return true
            }
          )
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.fields.slug} className="first:mt-0 mt-8">
                <header>
                  <h3 className="inline-block text-xl sm:text-2xl font-bold hover:underline leading-tight text-gray-800 dark:text-gray-200">
                    <TransitionLink to={node.fields.slug}>
                      {title}
                    </TransitionLink>
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
