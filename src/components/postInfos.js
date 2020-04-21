import React from "react"
import { format } from "date-fns"

import Tags from "./tags"

const PostInfos = ({ date, tags }) => (
  <div className="flex items-center">
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-calendar w-5 h-5"
      >
        <path
          className="fill-current text-gray-500 dark:text-gray-300"
          d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"
        />
        <path
          className="fill-current text-gray-800 dark:text-gray-600"
          d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"
        />
      </svg>
      <span className="ml-2 uppercase text-xs sm:text-sm text-gray-700 dark:text-gray-400">
        {format(new Date(date), "dd MMM yyyy")}
      </span>
    </div>
    <div className="flex">
      <Tags tags={tags} />
    </div>
  </div>
)

export default PostInfos
