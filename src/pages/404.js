import React from "react"
import { graphql } from "gatsby"

import NotFound from "./not_found.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1 className="text-gray-800 font-bold text-3xl">
        Oops... Nothing found here!
      </h1>
      <img src={NotFound} alt="404 illustration" className="my-10" />
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
