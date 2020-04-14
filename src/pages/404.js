import React from "react"
import { graphql, Link } from "gatsby"

import NotFound from "./not_found.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <div className="max-w-md mx-auto">
        <img src={NotFound} alt="404 illustration" className="mt-4" />
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-800 dark:text-gray-200 font-semibold text-3xl mt-4 sm:mt-6">
            Oops... Nothing found here!
          </p>
          <Link to="/">
            <button className="mt-2 bg-primary-700 px-4 py-2 w-full text-primary-100 font-semibold text-xl rounded">
              No big deal! take me back home{" "}
              <span role="img" aria-labelledby="OK Hand">
                👌
              </span>
            </button>
          </Link>
        </div>
      </div>
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
