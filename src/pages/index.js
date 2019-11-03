import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Post = styled.div`
  margin: var(--m-6) 0;
  display: flex;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StyledImage = styled(Image)`
  border: 1px solid var(--grey-100);
  background-color: white;
  border-radius: var(--small-radius);
  display: block;
  object-fit: cover;
  width: 200px;
  max-height: 150px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PostContent = styled.div`
  margin-left: var(--m-5);

  @media (max-width: 480px) {
    margin-left: 0;
    margin-top: var(--m-2);
  }

  h3 {
    margin: var(--m-1) 0;
    font-weight: 900;
    font-size: var(--text-2xl);
    color: var(--grey-800);

    a {
      text-decoration: none;
      box-shadow: none;
      color: inherit;
    }
  }

  small {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--grey-600);
  }

  p {
    font-size: var(--text-sm);
    color: var(--grey-700);
    line-height: 1.5;
  }
`;

const Greetings = styled.p`
  display: flex;
  flex-direction: column;
  background-color: var(--grey-100);
  padding: var(--p-4);
  border-radius: var(--small-radius);
  color: var(--grey-800);

  .wave {
    font-weight: 900;
    font-size: var(--text-3xl);
  }

  .text {
    margin-top: var(--m-3);
    font-size: var(--text-2xl);
    font-weight: 500;
  }
`;

function BlogIndex({ data, location }) {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO
        title="All posts"
        keywords={["blog", "javascript", "front-end", "react", "vue"]}
      />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Post key={node.fields.slug}>
            <StyledImage fluid={node.frontmatter.cover.image.fluid} />
            <PostContent>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>
                {node.frontmatter.date} | {node.timeToRead} minutes read
              </small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </PostContent>
          </Post>
        );
      })}
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            cover {
              image: childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
