import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Recall from "./recall"
import postComponents from "./postComponents"
import Newsletter from "./newsletter"

const shortcodes = { Newsletter, Recall }

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <MDXProvider components={{ ...shortcodes, ...postComponents }}>
      <div className="h-1 w-screen gradient fixed z-10" />
      <>
        <div className="py-5 md:px-0 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
          <header>
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <Link to={"/"}>
                <h1 className="gradient-text text-2xl md:text-3xl m-0 font-black">
                  <span role="img" aria-label="brain">
                    🧠
                  </span>{" "}
                  Thomlom
                </h1>
              </Link>

              {location.pathname !== rootPath ? (
                <Link to={"/"}>
                  <p className="gradient font-semibold px-3 py-1 rounded text-lg text-white">
                    All posts
                  </p>
                </Link>
              ) : (
                <>
                  <Link to={"/about"}>
                    <p className="font-semibold text-lg text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                      About me
                    </p>
                  </Link>
                </>
              )}
            </div>
          </header>
          <main className="max-w-2xl my-5 mx-auto w-full flex-1">
            {children}
          </main>
          <footer className="mb-4 md:mb-6">
            <p className="mt-2 md:mt-4 text-sm text-gray-700 dark:text-gray-300 font-medium text-center">
              © {new Date().getFullYear()} Thomas Lombart
            </p>
          </footer>
        </div>
      </>
    </MDXProvider>
  )
}

export default Layout
