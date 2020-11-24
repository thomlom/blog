import React from "react";
import { graphql, Link } from "gatsby";

import NotFound from "./not_found.svg";
import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = ({
  location,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <Layout location={location} title={title}>
      <SEO title="404: Not Found" />
      <img src={NotFound} alt="" className="mt-4" />
      <div className="flex flex-col items-center space-y-6">
        <p className="text-center text-gray-200 font-semibold text-3xl mt-4 sm:mt-6">
          Oops... Nothing found here!
        </p>
        <Link to="/">
          <button className="mt-2 bg-gray-300 px-4 py-2 w-full text-gray-900 font-semibold text-xl rounded-lg">
            Take me back home
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
