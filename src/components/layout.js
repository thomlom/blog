import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import postComponents from "./postComponents"
import Newsletter from "./newsletter"
import Recall from "./recall"
import Note from "./note"
import Comments from "./comments"

const shortcodes = { Note, Newsletter, Recall, Comments }

const allPosts = { to: "/all-posts", name: "All posts" }
const newsletter = {
  to: "https://buttondown.email/thomlom",
  name: "Newsletter",
}
const about = { to: "/about", name: "About" }

const links = [allPosts, newsletter, about]

const CustomLink = ({ to, name }) => {
  const linkClassNames =
    "py-3 sm:py-1 sm:px-3 sm:first:ml-0 sm:mt-0 font-semibold text-lg text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"

  const isExternal = to.startsWith("http")

  if (isExternal) {
    return (
      <a
        href={to}
        className={linkClassNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{name}</p>
      </a>
    )
  }

  return (
    <Link to={to} key={name} className={linkClassNames}>
      <p>{name}</p>
    </Link>
  )
}

const Layout = ({ location, children }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const [isOpen, setIsOpen] = React.useState(false)

  const titleClassNames =
    "text-gray-800 dark:text-gray-200 text-2xl m-0 font-black"

  return (
    <MDXProvider components={{ ...shortcodes, ...postComponents }}>
      <div className="p-3 md:px-0 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
        <header className="max-w-2xl mx-auto w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex justify-between items-center">
            {isRootPath ? (
              <h1 className={titleClassNames}>
                <Link to="/">{title}</Link>
              </h1>
            ) : (
              <Link className={titleClassNames} to="/">
                {title}
              </Link>
            )}
            <button
              type="button"
              className="px-2 text-gray-800 dark:text-gray-400 focus:outline-none sm:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-8 w-8 fill-current sm:hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } flex flex-col sm:flex sm:flex-row sm:items-center`}
          >
            {links.map(({ to, name }) => (
              <CustomLink to={to} name={name} key={name} />
            ))}
          </nav>
        </header>
        <main className="max-w-2xl my-5 mx-auto w-full flex-1">{children}</main>
        <footer className="my-2">
          <p className="font-medium text-center text-sm text-gray-700 dark:text-gray-300 ">
            © {new Date().getFullYear()} Thomas Lombart
          </p>
        </footer>
      </div>
    </MDXProvider>
  )
}

export default Layout
