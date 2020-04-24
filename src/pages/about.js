import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data: { photo } }) => {
  const textClassNames =
    "text-lg sm:text-2xl text-gray-600 dark:text-gray-500 mt-2 font-semibold leading-snug mt-4"

  const linkClassNames =
    "underline text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"

  return (
    <Layout>
      <SEO title="About me" />
      <Img
        fluid={photo.childImageSharp.fluid}
        className="rounded-lg shadow-xl"
      />
      <h2 className="text-xl sm:text-3xl text-gray-800 dark:text-gray-200 font-extrabold leading-tight mt-6">
        Hello, I'm Thomas Lombart.
      </h2>
      <p className={textClassNames}>
        I'm a french front-end engineer. I currently work for{" "}
        <a
          href="https://www.backmarket.com"
          className={linkClassNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          Back Market
        </a>
        .
      </p>
      <p className={textClassNames}>
        I help developers level-up their front-end skills through high-quality
        posts on JavaScript, modern frameworks, design, and more.
      </p>
      <p className={textClassNames}>
        I love productivity and minimalism. I'm the guy who focuses on what
        matters. I care about ecology and privacy.
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
        . I usually answer within one business day.
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    photo: file(absolutePath: { regex: "/nature.jpg/" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1000, maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
