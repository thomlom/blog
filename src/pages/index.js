import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import useDarkMode from "use-dark-mode"

import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import PostInfos from "../components/postInfos"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

import Twitter from "../icons/twitter.png"
import GitHubLight from "../icons/github_light.png"
import GitHubDark from "../icons/github_dark.png"

const marginBetweenSections = "mt-6 sm:mt-10"

const PostSection = ({ title, posts }) => (
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

const Bio = ({ photo }) => {
  const { value: isDarkMode } = useDarkMode()

  return (
    <div className="bg-gray-200 rounded p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-between dark:bg-gray-800">
      <div className="flex flex-col justify-center items-center">
        <Img
          fixed={photo.childImageSharp.fixed}
          className="rounded-full shadow-lg"
        />
        <div className="flex space-x-4 mt-2">
          <a
            href="https://twitter.com/thomas_lombart"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <img src={Twitter} alt="Twitter logo" className="h-8 w-8" />
          </a>
          <a
            href="https://github.com/thomlom"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <img
              src={isDarkMode ? GitHubLight : GitHubDark}
              alt="GitHub logo"
              className="h-8 w-8"
            />
          </a>
        </div>
      </div>
      <div className="mt-4 sm:ml-8 sm:mt-0">
        <h2 className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200 font-extrabold leading-tight">
          Hello, I'm Thomas Lombart, a front-end engineer.{" "}
          <span role="img" aria-label="Waving hand">
            👋
          </span>
        </h2>
        <h3 className="text-lg text-gray-700 dark:text-gray-400 font-semibold leading-snug mt-2">
          I help developers level-up their front-end skills through high-quality
          posts on modern JavaScript, design and more!
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
      <SEO title="Blog" description={description} />
      <Bio photo={photo} />
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
            popular
          }
        }
      }
    }
  }
`
