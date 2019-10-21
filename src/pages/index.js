import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Post = styled.div`
  margin: var(--m-6) 0;
  display: flex;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  border: 1px solid var(--grey-white);
  border-radius: var(--small-radius);
  display: block;
  object-fit: cover;
  width: 135px;
  max-height: 135px;

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
    color: var(--grey-500);
  }

  p {
    font-size: var(--text-sm);
    color: var(--grey-700);
    line-height: 1.5;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin: var(--m-3) 0;
`;

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={["blog", "javascript", "front-end", "react", "vue"]}
      />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Post key={node.fields.slug}>
            <Image src={node.frontmatter.cover.publicURL} />
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
      <Footer>
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img
            alt="Licence Creative Commons"
            style={{ borderWidth: "0" }}
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          />
        </a>
      </Footer>
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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
              publicURL
            }
          }
        }
      }
    }
  }
`;
