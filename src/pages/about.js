import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const textClassNames =
    "text-xl sm:text-2xl text-gray-600 dark:text-gray-500 mt-2 font-semibold leading-snug mt-4"

  const linkClassNames =
    "underline text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About me" />
      <p className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-200 font-extrabold leading-tight">
        Hey there!{" "}
        <span role="img" aria-label="Waving hand">
          👋
        </span>
        <br />
        I'm Thomas Lombart, a front-end engineer.
      </p>
      <p className={textClassNames}>
        I currently work for{" "}
        <a
          href="https://www.backmarket.com"
          className={linkClassNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          Back Market
        </a>
        .
        <br />I write about front-end development to level up your skills
        whether it's JavaScript stuff, performance, accessibility or design.
      </p>
      <p className={textClassNames}>
        I love productivity, minimalism and being organized. I'm the guy who
        focuses on what matters. I value privacy and ecology.
      </p>
      <p className={textClassNames}>
        On my spare time, I train, travel, hike, watch good movies and listen to
        their soundtracks (obviously, I find Hans Zimmer's music awesome).
      </p>
      <p className={textClassNames}>
        If you want to say hi or have questions, feel free to reach out{" "}
        <a className={linkClassNames} href="mailto:t.lombart97@gmail.com">
          by mail
        </a>
        . I usually answer within one business day 💌
      </p>
      <p className={textClassNames}>
        Find me on{" "}
        <a
          href="https://twitter.com/thomas_lombart"
          className={linkClassNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        ,{" "}
        <a
          className={linkClassNames}
          href="https://github.com/thomlom"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          href="https://fr.linkedin.com/in/thomas-lombart"
          className={linkClassNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
