import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import TransitionLink from "../components/transitionLink";
import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogPostTemplate = ({
  pageContext: { next },
  data: {
    mdx: post,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => {
  const { body } = post;
  const {
    cover,
    coverCredit,
    title,
    seoTitle,
    description,
    date,
    tags,
    next: nextLink,
  } = post.frontmatter;

  const tagsString = tags.join(", ");

  return (
    <Layout location={location} inBlog>
      <SEO
        title={seoTitle || title}
        description={description || post.excerpt}
        coverURL={siteUrl + cover.publicURL}
      />
      <article className="max-w-full sm:max-w-2xl sm:mx-auto">
        <header>
          <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight text-gray-200">
            {title}
          </h1>
          <div className="mt-2 flex justify-between text-sm text-gray-300 uppercase font-semibold">
            <span>{tagsString}</span>
            <span>{date}</span>
          </div>
        </header>
        {cover && (
          <>
            <Img
              fluid={cover.childImageSharp.fluid}
              className="rounded-lg mt-4"
            />
            {coverCredit ? (
              <p className="mt-2 text-gray-300 text-center">{coverCredit}</p>
            ) : null}
          </>
        )}
        <section className="mt-6">
          <MDXRenderer>{body}</MDXRenderer>
        </section>
        {nextLink ? (
          <>
            <hr className="mb-4" />
            <TransitionLink paintDrip to={next.fields.slug}>
              <div className="p-4 border shadow-lg rounded-lg bg-gray-800 border-none my-2">
                <span className="uppercase text-sm text-gray-300 tracking-wide flex items-center font-semibold">
                  <span role="img" aria-label="Eyes" className="mr-1 text-xl">
                    👀
                  </span>
                  This post may also interest you
                </span>
                <p className="text-gray-200 text-2xl font-bold mt-1 leading-tight underline">
                  {next.frontmatter.title}
                </p>
              </div>
            </TransitionLink>
          </>
        ) : null}
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        seoTitle
        description
        date(formatString: "MMM DD, YYYY")
        tags
        next
        cover {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        coverCredit
      }
    }
  }
`;
