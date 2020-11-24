import React from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";

import Layout from "../components/layout";
import PostPreview from "../components/postPreview";
import SEO from "../components/seo";

import GitHubIcon from "../icons/github.png";

const Summary = () => (
  <div className="space-y-3 sm:space-y-5">
    <h2 className="text-2xl sm:text-4xl uppercase tracking-wide font-black text-gray-100 flex flex-col">
      <span>Hello. I'm Thomas,</span>
      <span>A front-end engineer.</span>
    </h2>
    <h3 className="text-lg sm:text-xl text-gray-400 font-semibold sm:max-w-xl">
      I have industry experience in building web applications with JavaScript
      technologies. I also write technical articles, contribute to open-source,
      and more recently, mentor aspiring developers.
    </h3>
    <a
      href="mailto:thomas.lombart@hey.com"
      className="inline-block px-4 py-2 text-base sm:px-6 sm:py-2 rounded-lg font-bold text-gray-100 sm:text-lg bg-gradient-to-r from-indigo-700 to-pink-800 shadow"
    >
      thomas.lombart@hey.com
    </a>
  </div>
);

const Block = ({ children }) => (
  <section className="flex-1 shadow-xl rounded-lg bg-gray-800 p-5 sm:p-8 space-y-4">
    {children}
  </section>
);

const SectionHeading = ({ children }) => (
  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-100 uppercase">
    {children}
  </h3>
);

const InlineLink = ({ link, children }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold underline"
  >
    {children}
  </a>
);

const LatestPosts = ({ posts }) => (
  <Block>
    <div className="flex justify-between items-center">
      <SectionHeading>Blog</SectionHeading>
      <Link
        to="/all-posts"
        className="text-sm sm:text-base inline-block bg-gray-100 px-3 py-1 rounded-lg font-bold shadow-lg"
      >
        See all posts
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
      {posts.map(({ node }) => (
        <PostPreview key={node.fields.slug} node={node} />
      ))}
    </div>
  </Block>
);

const BlockCta = ({ link, src, children }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 flex justify-center items-center gap-3 bg-gray-100 rounded-lg"
  >
    <img src={src} className="h-8 w-8" alt="" />
    <span className="text-gray-900 font-bold">{children}</span>
  </a>
);

const Mentoring = () => (
  <Block>
    <SectionHeading>Mentoring</SectionHeading>
    <p className="text-gray-200 flex flex-col space-y-2">
      <span>
        I mentor aspiring front-end developers on various subjects such as
        JavaScript technologies (React and Vue), writing technical articles, or
        even productivity.
      </span>
      <TextBold>
        If you want to level-up your front-end skills, let's get in touch.
      </TextBold>
    </p>
    <BlockCta
      link="https://mentorcruise.com/mentor/ThomasLombart/"
      src="https://cdn.mentorcruise.com/img/cruise_black_small.png"
    >
      Become my mentee
    </BlockCta>
  </Block>
);

const TextBold = ({ children }) => (
  <span className="font-semibold">{children}</span>
);

const OpenSource = () => (
  <Block>
    <SectionHeading>Open Source</SectionHeading>
    <p className="text-gray-200 flex flex-col space-y-2">
      <span>
        I use open-source software in my everyday job. It feels natural to give
        back to the community and contribute to it when I have time.
      </span>
      <span>
        Right now, I focus on an{" "}
        <InlineLink link="https://github.com/testing-library/eslint-plugin-testing-library">
          ESLint plugin for Testing Library.
        </InlineLink>
      </span>
    </p>
    <BlockCta link="https://github.com/thomlom/" src={GitHubIcon}>
      GitHub profile
    </BlockCta>
  </Block>
);

const About = ({ photo }) => (
  <Block>
    <SectionHeading>About me</SectionHeading>
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      <Image
        fixed={photo.childImageSharp.fixed}
        className="rounded-full border-2 border-gray-200 p-2"
      />
      <p className="flex-1 flex flex-col space-y-3 text-gray-200">
        <span>
          My name is Thomas Lombart. I live in France. I have a degree in
          computer science but{" "}
          <TextBold>I learnt web development by myself.</TextBold>
        </span>
        <span>
          I currently work remotely for{" "}
          <InlineLink link="https://www.backmarket.com/">
            Back Market
          </InlineLink>
          , a marketplace for refurbished products. I’ve also worked, in the
          past, for Decathlon and Mindbaz. I learned along the way{" "}
          <TextBold>
            how to build accessible, performant, beautiful and well-tested web
            applications.
          </TextBold>
        </span>
        <span>
          I acquired{" "}
          <TextBold>strong communication and writing skills</TextBold> over the
          years. I’m{" "}
          <TextBold>
            self-driven, product-oriented and I always want to give the best of
            myself.
          </TextBold>
        </span>
      </p>
    </div>
  </Block>
);

const Home = ({
  location,
  data: {
    site: {
      siteMetadata: { description },
    },
    photo,
    allMdx,
  },
}) => {
  const posts = allMdx.edges.slice(0, 2);

  return (
    <Layout location={location}>
      <SEO description={description} />
      <div className="mt-2 space-y-8 sm:space-y-10">
        <Summary />
        <LatestPosts posts={posts} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          <Mentoring />
          <OpenSource />
        </div>
        <About photo={photo} />
      </div>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
    photo: file(absolutePath: { regex: "/photo.jpeg/" }) {
      publicURL
      childImageSharp {
        fixed(width: 150) {
          ...GatsbyImageSharpFixed
        }
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
            date(formatString: "MMM DD, YYYY")
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
