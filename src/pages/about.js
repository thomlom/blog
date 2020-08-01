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
        Hey, I'm Thomas Lombart.
      </h2>
      <p className={textClassNames}>
        I’m a front-end engineer from France. I currently work at{" "}
        <a
          href="https://www.backmarket.com"
          className={linkClassNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          Back Market
        </a>
        , a marketplace for refurbished products.
      </p>
      <p className={textClassNames}>
        Aside from my full-time job, I help developers level-up their careers
        through posts on JavaScript, Vue and more. I like to spend time on open
        source software as well.
      </p>
      <p className={textClassNames}>
        To get a better glimpse of who I am, here are words that define me:
        Techie. Web development. Writing. Open-source. Minimalism. Simple.
        Ecology. No waste. Privacy. Work out. Hiking. Travel. Music. Piano.
        Movies soundtracks.
      </p>
      <p className={textClassNames}>
        If you want to say hi or have any questions, feel free to reach out{" "}
        <a className={linkClassNames} href="mailto:lombart.thomas@icloud.com">
          by mail.
        </a>
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
