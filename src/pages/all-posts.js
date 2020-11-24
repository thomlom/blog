import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostPreview from "../components/postPreview";
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
  const posts = allMdx.edges;
  const [search, setSearch] = React.useState("");

  return (
    <Layout location={location}>
      <SEO title="All posts" description={description} />
      <div className="bg-gray-800 p-4 mb-6 rounded-lg shadow">
        <label className="block text-xl text-gray-100 font-bold">
          Search a post
          <input
            type="text"
            className="bg-gray-900 text-gray-200 border-gray-700 placeholder-gray-500 shadow mt-3 focus:ring focus:ring-gray-800 rounded py-2 px-4 block w-full appearance-none "
            placeholder="tools, javascript"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">
        {posts
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
            <PostPreview key={node.fields.slug} node={node} />
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
