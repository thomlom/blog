import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlePreview from "../components/articlePreview";
import Seo from "../components/seo";

const BlogIndex = ({
  data: {
    site: {
      siteMetadata: { description },
    },
    allMdx,
  },
}) => {
  const [search, setSearch] = React.useState("");
  const articles = allMdx.edges;

  return (
    <Layout>
      <div className="flex-1 space-y-8">
        <Seo title="All articles" description={description} />
        <div className="rounded-lg shadow ">
          <label className="block text-xl font-semibold text-gray-100 sm:text-2xl">
            Search an article
            <input
              type="text"
              className="block w-full px-4 py-3 mt-3 text-gray-100 placeholder-gray-400 bg-gray-800 border-gray-700 rounded shadow appearance-none sm:px-6 focus:ring focus:ring-gray-800 "
              placeholder="react, productivity"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <main className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
        </main>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  {
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
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`;
