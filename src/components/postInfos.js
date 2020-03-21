import React from "react"
import { format } from "date-fns"

const tagsColor = {
  discord: {
    backgroundColor: "#3957BF",
    color: "#FFF",
  },
  react: {
    backgroundColor: "#61DAFB",
    color: "#000",
  },
  javascript: {
    backgroundColor: "#F0DB4F",
    color: "#323330",
  },
  test: {
    backgroundColor: "#BD3030",
    color: "#F2E6E6",
  },
  tooling: {
    backgroundColor: "#21374B",
    color: "#E6ECF2",
  },
  css: {
    backgroundColor: "#A611A4",
    color: "#FFF",
  },
  html: {
    backgroundColor: "#C9350E",
    color: "#FFF",
  },
  vscode: {
    backgroundColor: "#0072CC",
    color: "#fff",
  },
  vue: {
    backgroundColor: "#3DCC8C",
    color: "#35495E",
  },
  career: {
    backgroundColor: "#914E0F",
    color: "#F2ECE6",
  },
  personal: {
    backgroundColor: "#E6E6FF",
    color: "#3525E6",
  },
  performance: {
    backgroundColor: "#404040",
    color: "#E6E6E6",
  },
}

const PostInfos = ({ date, tags, quick }) => (
  <div className="flex flex-col-reverse  md:flex md:flex-row md:items-center mt-2">
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-calendar w-5 h-5"
      >
        <path
          className="fill-current text-gray-500"
          d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"
        />
        <path
          className="fill-current text-gray-800"
          d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"
        />
      </svg>
      <span className="ml-2 uppercase text-gray-700 text-sm">
        {format(new Date(date), "dd MMM yyyy")}
      </span>
    </div>

    <div className="flex flex-1">
      <div className="flex-1 mb-2 md:mb-0 md:ml-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="first:ml-0 inline-block ml-2 py-1 px-2 text-sm rounded font-semibold"
            style={tagsColor[tag]}
          >
            {tag}
          </span>
        ))}
      </div>

      {quick && (
        <span className="bg-yellow-400 text-yellow-900 text-sm font-semibold py-1 px-2 rounded-full self-start">
          Quick read
        </span>
      )}
    </div>
  </div>
)

export default PostInfos
