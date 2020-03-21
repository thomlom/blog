import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import postComponents from "./postComponents"
import Newsletter from "./newsletter"

const shortcodes = { Newsletter }

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <MDXProvider components={{ ...shortcodes, ...postComponents }}>
      <div className="p-3 md:px-0 bg-gray-100 min-h-screen flex flex-col">
        <header>
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link to={"/"}>
              <h1 className="text-primary-700 text-4xl m-0 font-black">
                Thomlom
              </h1>
            </Link>
            {location.pathname !== rootPath ? (
              <Link to={"/"}>
                <p className="gradient px-3 py-1 rounded text-primary-100 font-bold shadow">
                  See all posts
                </p>
              </Link>
            ) : (
              <Link to={"/about"}>
                <p className="gradient px-3 py-1 rounded text-primary-100 font-bold shadow">
                  About me
                </p>
              </Link>
            )}
          </div>
        </header>
        <main className="max-w-2xl my-5 mx-auto w-full flex-1">{children}</main>
        <footer className="mb-4 md:mb-6">
          <p className="mt-2 md:mt-4 text-sm text-gray-700 font-medium text-center">
            © {new Date().getFullYear()} Thomas Lombart
          </p>
        </footer>
      </div>
    </MDXProvider>
  )
}

export default Layout
