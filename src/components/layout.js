import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";

import postComponents from "./postComponents";
import Recall from "./recall";
import Note from "./note";
import Comments from "./comments";
import MentorBanner from "./mentorBanner";

const shortcodes = { Note, Recall, Comments, MentorBanner };

const Layout = ({ location, inBlog, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const {
    site: {
      siteMetadata: { title },
    },
    icon: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        icon: file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width: 48, height: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  );

  return (
    <MDXProvider components={{ ...shortcodes, ...postComponents }}>
      <div className="p-4 sm:py-6 bg-gray-900">
        <div
          className={`flex flex-col min-h-screen mx-auto space-y-6 ${
            inBlog ? "max-w-2xl" : "max-w-3xl"
          }`}
        >
          <header>
            <Link
              to="/"
              className="text-gray-200 text-xl font-black flex items-center"
            >
              <Image fixed={fixed} className="rounded-full" />
              {isRootPath ? (
                <h1 className="ml-4">{title}</h1>
              ) : (
                <span className="ml-4">{title}</span>
              )}
            </Link>
          </header>
          <main>{children}</main>
          <footer className="mt-auto">
            <p className="font-medium text-center text-sm text-gray-300 ">
              © {new Date().getFullYear()} Thomas Lombart
            </p>
          </footer>
        </div>
      </div>
    </MDXProvider>
  );
};

export default Layout;
