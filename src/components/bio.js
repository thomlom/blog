import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import styled from "styled-components";

const BioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 1rem;
    flex-direction: column;
  }

  p {
    color: #dceefb;
    line-height: 1.625;

    @media screen and (max-width: 480px) {
      order: 2;
    }

    a {
      color: var(--grey-white);
    }

    .greetings {
      font-size: var(--text-4xl);
      line-height: 1.25;
      font-weight: 700;

      @media screen and (max-width: 480px) {
        font-size: var(--text-2xl);
      }
    }

    .text {
      display: block;
      font-size: var(--text-3xl);
      margin-top: var(--m-3);

      @media screen and (max-width: 480px) {
        font-size: var(--text-xl);
      }
    }
  }
`;

const Picture = styled(Image)`
  margin-left: var(--m-7);
  margin-bottom: 0;
  min-width: 200px;
  object-fit: cover;
  border-radius: 100%;
  border: 4px solid var(--grey-white);
  box-shadow: var(--shadow-large);

  @media screen and (max-width: 768px) {
    margin-left: var(--m-5);
  }

  @media screen and (max-width: 480px) {
    order: 1;
  }
`;

function Bio() {
  const {
    site: { siteMetadata },
    avatar,
  } = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/pic.jpg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `);

  const {
    author,
    social: { twitter: twitterUsername, github: githubUsername },
  } = siteMetadata;

  return (
    <BioContainer>
      <p>
        <span className="greetings">Hey there! I'm Thomas.</span>
        <span className="text">
          I'm a front-end developer. I love building apps and writing useful
          posts. Follow me on{" "}
          <a href={`https://twitter.com/${twitterUsername}`}>Twitter</a> &amp;{" "}
          <a href={`https://github.com/${githubUsername}`}>GitHub</a>.
        </span>
      </p>
      <Picture fixed={avatar.childImageSharp.fixed} alt={author} />
    </BioContainer>
  );
}

export default Bio;
