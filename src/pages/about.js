import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ location, data: { photo, site } }) => {
  const textClassNames =
    "text-lg sm:text-2xl text-gray-500 mt-2 font-semibold leading-snug mt-4"

  const linkClassNames = "underline text-gray-300 hover:text-gray-200"

  return (
    <Layout location={location}>
      <SEO title="About me" description={site.siteMetadata.author.summary} />
      <Img
        fluid={photo.childImageSharp.fluid}
        className="rounded-lg shadow-xl"
      />
      <h2 className="text-xl sm:text-3xl text-gray-200 font-extrabold leading-tight mt-6">
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
        Here is a list of words to get a better glimpse of who I am: Techie. Web
        development. Design. Writing. Open-source. Minimalist. Hiking. Travel.
        Music. Piano.
      </p>
      <p className={textClassNames}>
        If you want to say hi or have any questions, please reach out by{" "}
        <a className={linkClassNames} href="mailto:t.lombart97@gmail.com">
          mail
        </a>{" "}
        or via{" "}
        <a className={linkClassNames} href="https://twitter.com/thomas_lombart">
          Twitter
        </a>
        .
      </p>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          summary
        }
      }
    }
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
