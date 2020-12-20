import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlePreview from "../components/articlePreview";
import SEO from "../components/seo";

const BlogIndex = ({
  data: {
    site: {
      siteMetadata: { description },
    },
    allMdx,
  },
  location,
}) => {
  const articles = allMdx.edges;
  const [search, setSearch] = React.useState("");

  return (
    <Layout location={location}>
      <SEO title="All articles" description={description} />
      <div className="p-4 mb-2 bg-gray-800 rounded-lg shadow">
        <label className="block text-xl font-bold text-gray-100">
          Search an article
          <input
            type="text"
            className="block w-full px-4 py-2 mt-3 text-gray-200 placeholder-gray-500 bg-gray-900 border-gray-700 rounded shadow appearance-none focus:ring focus:ring-gray-800 "
            placeholder="tools, javascript"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {articles
          .filter(
            ({
              node: {
                frontmatter: { title, tags },
              },
            }) => {
              const lowercasedTitle = title.toLowerCase();
              const lowercasedSearch = search.toLowerCase();
              const wordsSearched = lowercasedSearch
                .split(/[ ,]+/)
                .filter(Boolean);

              if (wordsSearched.length > 0) {
                return (
                  lowercasedTitle.includes(lowercasedSearch) ||
                  tags.some((tag) =>
                    wordsSearched.some((word) => tag.includes(word))
                  )
                );
              }

              return true;
            }
          )
          .map(({ node }) => (
            <ArticlePreview key={node.fields.slug} node={node} />
          ))}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            cover {
              publicURL
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
