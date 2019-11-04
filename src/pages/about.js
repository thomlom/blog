import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Question = styled.p`
  font-weight: 900;
  font-size: var(--text-3xl);
  color: var(--grey-900);
`;

const Answer = styled.p`
  font-size: var(--text-xl);
  color: var(--grey-800);
  line-height: 1.5;

  a {
    font-weight: 700;
    color: var(--grey-800);
  }
`;

function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <Question> Who are you?</Question>
      <Answer>
        My name is Thomas Lombart. I'm a front-end developer with industry
        experience specializing in JavaScript technologies such as React and
        Vue. I love to build user-focused apps with UX, testing and performance
        constraints in mind. I write articles, give workshops and contribute to
        open source on my spare time.
      </Answer>
      <Question>Where can I follow you?</Question>
      <Answer>
        You can follow me on{" "}
        <a
          href="https://twitter.com/thomas_lombart"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>{" "}
        &amp;{" "}
        <a
          href="https://github.com/thomlom"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </Answer>
    </Layout>
  );
}

export default NotFoundPage;
