import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const textClassNames =
    "text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-2 font-semibold leading-snug mt-4"

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
        I'm Thomas Lombart.
      </p>
      <p className={textClassNames}>
        I'm a french front-end engineer at Back Market. I write about code,
        design and everything in between. I also contribute to open source when
        I'm not busy doing other things.
      </p>
      <p className={textClassNames}>
        On a personal side, I love travelling, training, hiking, watching good
        movies (and listening to their soundtracks). I care about privacy and
        ecology.
      </p>
      <p className={textClassNames}>
        You can find me on{" "}
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
      <p className={textClassNames}>
        If you want to say hi, have questions or for any other demands,{" "}
        <a className={linkClassNames} href="mailto:t.lombart97@gmail.com">
          feel free to reach out by mail
        </a>
        . I usually answer within one business day 💌
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
