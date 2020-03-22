import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const textClassNames =
    "text-xl sm:text-2xl text-gray-600 mt-2 font-semibold leading-snug mt-4 "

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About me" />
      <p className="text-2xl sm:text-4xl text-gray-800 font-extrabold leading-tight">
        Hey there!{" "}
        <span role="img" aria-label="Waving hand">
          👋
        </span>
        <br />
        I'm Thomas Lombart.
      </p>
      <p className={textClassNames}>
        I'm a french front-end engineer at Back Market. I write and speak about
        code, design and everything in between. I also contribute to open source
        when I'm not busy doing other things.
      </p>
      <p className={textClassNames}>
        On a personal side, I love travelling, training, watching good movies
        (and listening to their soundtracks). I care about privacy and ecology.
      </p>
      <a
        className={`${textClassNames} block underline text-primary-700 hover:text-primary-800`}
        href="mailto:t.lombart97@gmail.com"
      >
        Feel free to reach out!
      </a>
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
