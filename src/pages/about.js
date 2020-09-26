import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location, data: { photo } }) => {
  const textClassNames =
    "text-lg sm:text-2xl text-gray-600 dark:text-gray-500 mt-2 font-semibold leading-snug mt-4"

  const linkClassNames =
    "underline text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"

  return (
    <Layout location={location}>
      <SEO title="About me" />
      <Img
        fluid={photo.childImageSharp.fluid}
        className="rounded-lg shadow-xl"
      />
      <h2 className="text-xl sm:text-3xl text-gray-800 dark:text-gray-200 font-extrabold leading-tight mt-6">
        Hey, I'm Thomas Lombart.
      </h2>
      <p className={textClassNames}>
        I’m a senior front-end engineer from France. I currently work at{" "}
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
        Besides my full-time job, I write on tools and productivity for
        developers to get the most of their careers. I like to spend time on
        open source software as well.
      </p>
      <p className={textClassNames}>
        Here is a non-exhaustive list of words to get a better glimpse of who I
        am: Techie. Web development. Writing. Open-source. Minimalist.
        Ecologist. Hiking. Travel. Music. Piano.
      </p>
      <p className={textClassNames}>
        If you want to say hi or have any questions, feel free to{" "}
        <a className={linkClassNames} href="mailto:t.lombart97@gmail.com">
          get in touch.
        </a>
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    photo: file(absolutePath: { regex: "/about.jpg/" }) {
      publicURL
      childImageSharp {
        fluid(maxHeight: 450) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
